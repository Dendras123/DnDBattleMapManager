import { Module } from '@nestjs/common';
import { DrawEventsGateway } from './draw-events.gateway';
import { RoomEventsGateway } from './room-events.gateway';
import { RoomsModule } from 'src/rooms/room.module';

@Module({
  imports: [RoomsModule],
  providers: [DrawEventsGateway, RoomEventsGateway],
})
export class EventsModule {}
