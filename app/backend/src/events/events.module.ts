import { Module } from '@nestjs/common';
import { DrawEventsGateway } from './draw-events.gateway';
import { RoomEventsGateway } from './room-events.gateway';
import { RoomsModule } from 'src/rooms/room.module';
import { ImageEventsGateway } from './image-events.gateway';
import { ImagesModule } from 'src/images/image.module';

@Module({
  imports: [RoomsModule, ImagesModule],
  providers: [DrawEventsGateway, RoomEventsGateway, ImageEventsGateway],
})
export class EventsModule {}
