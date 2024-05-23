import { Point } from './drawTypes';

export interface UploadedImage {
  id: string;
  name: string;
  defaultPosition: Point;
  element: HTMLImageElement;
}

export interface SocketResImage {
  id: string;
  name: string;
  defaultPosition: Point;
  base64Image: string;
}

export interface Coordinates {
  roomId: string;
  imageId: string;
  position: Point;
}

export type SocketResCoordinates = Omit<Coordinates, 'roomId'>;
