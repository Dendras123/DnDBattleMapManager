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
import { UploadImageDto } from 'src/types/imageTypes';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ImageEventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('send-image')
  sendImage(
    @MessageBody() data: UploadImageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const path = `./storage/${data.roomId}/${data.imageId}.png`;
    const base64String = readFileSync(path, {
      encoding: 'base64',
    });
    const base64Image = 'data:image/png;base64,' + base64String;

    client.broadcast.to(data.roomId).emit('get-image', {
      id: data.imageId,
      base64Image: base64Image,
    });
  }
}
