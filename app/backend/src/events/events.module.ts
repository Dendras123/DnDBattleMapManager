import { Module } from '@nestjs/common';
import { DrawEventsGateway } from './draw-events.gateway';
import { RoomEventsGateway } from './room-events.gateway';
import { RoomsModule } from 'src/rooms/room.module';
import { ImageEventsGateway } from './image-events.gateway';

@Module({
  imports: [RoomsModule],
  providers: [DrawEventsGateway, RoomEventsGateway, ImageEventsGateway],
})
export class EventsModule {}
