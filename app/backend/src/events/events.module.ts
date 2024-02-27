import { Module } from '@nestjs/common';
import { DrawEventsGateway } from './draw-events.gateway';
import { RoomGateway } from './room.gateway';

@Module({
  providers: [DrawEventsGateway, RoomGateway],
})
export class EventsModule {}
