import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { readFileSync } from 'fs';
import { Socket, Server } from 'socket.io';
import { RoomsService } from 'src/rooms/room.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomEventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('createRoom')
  async createRoom(@ConnectedSocket() client: Socket) {
    const newRoom = await this.roomsService.create();

    client.emit('roomCreated', newRoom.id);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    // join room
    client.join(roomId);
    client.nsp.to(roomId).emit('roomJoined', client.id);
    // return canvas state
    try {
      const base64String = readFileSync(`./storage/${roomId}/canvasState.png`, {
        encoding: 'base64',
      });
      const canvasState = 'data:image/png;base64,' + base64String;

      client.emit('get-canvas-state', canvasState);
    } catch (err) {
      console.log('The canvas state is not saved yet!');
    }
  }
}
