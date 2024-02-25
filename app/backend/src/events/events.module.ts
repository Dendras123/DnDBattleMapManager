import { Module } from '@nestjs/common';
import { DrawEventsGateway } from './draw-events.gateway';

@Module({
  providers: [DrawEventsGateway],
})
export class EventsModule {}
