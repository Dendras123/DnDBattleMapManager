import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DrawEvent } from 'src/types/drawTypes';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DrawEventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('draw')
  drawLine(@MessageBody() data: DrawEvent, @ConnectedSocket() client: Socket) {
    client.broadcast.to(data.roomId).emit('draw', { data });
  }
}
