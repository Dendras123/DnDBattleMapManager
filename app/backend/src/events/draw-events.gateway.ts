import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RoomsService } from 'src/rooms/room.service';
import { DrawEvent } from 'src/types/drawTypes';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DrawEventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('draw')
  drawLine(@MessageBody() data: DrawEvent, @ConnectedSocket() client: Socket) {
    client.broadcast.to(data.roomId).emit('draw', { data });
  }
}
