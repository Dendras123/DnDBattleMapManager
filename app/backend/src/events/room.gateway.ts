import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createRoom')
  createRoom(@ConnectedSocket() client: Socket) {
    const roomId = randomUUID();
    // TODO: SAVE ROOM ID TO DB

    client.emit('roomCreated', roomId);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    client.join(roomId);
    client.nsp.to(roomId).emit('roomJoined', client.id);
  }
}
