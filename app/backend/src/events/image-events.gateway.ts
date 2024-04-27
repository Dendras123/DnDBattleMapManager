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
import { CoordinatesDto, UploadImageDto } from 'src/images/image.types';
import { RoomsService } from 'src/rooms/room.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ImageEventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly imagesService: ImagesService,
  ) {}

  @SubscribeMessage('send-image')
  async sendImage(
    @MessageBody() data: UploadImageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const image = await this.imagesService.findOne(data.imageId);

    if (!image) {
      throw new Error(`Image with ID ${data.imageId} does not exist.`);
    }

    const path = `./storage/${data.roomId}/${data.imageId}.png`;
    const base64String = readFileSync(path, {
      encoding: 'base64',
    });
    const base64Image = 'data:image/png;base64,' + base64String;

    client.broadcast.to(data.roomId).emit('get-image', {
      id: data.imageId,
      name: image.name,
      base64Image: base64Image,
    });
  }

  @SubscribeMessage('send-coordinates')
  async sendCoordinates(
    @MessageBody() data: CoordinatesDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.imagesService.saveCoordinates(data);

    client.broadcast.to(data.roomId).emit('get-coordinates', {
      imageId: data.imageId,
      position: data.position,
    });
  }
}
