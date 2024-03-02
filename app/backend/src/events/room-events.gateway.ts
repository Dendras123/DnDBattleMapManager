import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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
    client.join(roomId);
    client.nsp.to(roomId).emit('roomJoined', client.id);
  }
}
