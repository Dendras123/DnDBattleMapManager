import { Room } from 'src/rooms/room.entity';

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface ImageDto {
  roomId: string;
  imageId: string;
}

export interface CoordinatesDto extends ImageDto {
  position: Position;
}

export interface CreateImage {
  id: string;
  name: string;
  extension: string;
  position: Position;
  room: Room;
}

export interface UpdateZIndexDto extends ImageDto {
  zIndexChange: number;
}

export interface UpdateScaleDto extends ImageDto {
  scale: number;
}
