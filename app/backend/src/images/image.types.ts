import { Point } from 'src/types/drawTypes';

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface ImageDto {
  roomId: string;
  imageId: string;
}

export interface CoordinatesDto {
  roomId: string;
  imageId: string;
  position: Point;
}

export interface CreateImage {
  id: string;
  name: string;
  extension: string;
  position: Position;
}
