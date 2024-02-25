import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Draw } from 'src/types/drawTypes';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DrawEventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('draw')
  drawLine(@MessageBody() data: Draw, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('draw', { data });
  }
}
