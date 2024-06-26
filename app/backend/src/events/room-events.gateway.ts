import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { readFileSync } from 'fs';
import { Socket, Server } from 'socket.io';
import { ImagesService } from 'src/images/image.service';
import { RoomsService } from 'src/rooms/room.service';
import { CreateRoomDto } from 'src/rooms/room.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomEventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly imagesService: ImagesService,
  ) {}

  @SubscribeMessage('create-room')
  async createRoom(
    @MessageBody() data: CreateRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const newRoom = await this.roomsService.create(data);

    client.emit('room-created', newRoom.id);
  }

  @SubscribeMessage('join-room')
  async joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    // join room
    if (client.rooms.has(roomId)) {
      return;
    }

    client.join(roomId);
    client.nsp.to(roomId).emit('room-joined', client.id);
    try {
      const room = await this.roomsService.findOne(roomId);
      // get room board size and name
      client.emit('get-room-data', {
        width: room.width,
        height: room.height,
        name: room.name,
      });

      // get canvas state
      const base64String = readFileSync(`./storage/${roomId}/canvasState.png`, {
        encoding: 'base64',
      });
      const canvasState = 'data:image/png;base64,' + base64String;

      client.emit('get-canvas-state', canvasState);
      // get images
      const images = await this.imagesService.findAllInRoom(room);

      for (const image of images) {
        const base64Image = this.imagesService.readImageBase64(
          roomId,
          image.id,
          image.extension,
        );

        client.emit('get-image', {
          id: image.id,
          name: image.name,
          defaultPosition: image.position,
          defaultScale: image.scale,
          base64Image: base64Image,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
