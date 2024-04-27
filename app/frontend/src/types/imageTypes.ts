import { Point } from './drawTypes';

export interface UploadedImage {
  id: string;
  name: string;
  element: HTMLImageElement;
}

export interface SocketResImage {
  id: string;
  name: string;
  base64Image: string;
}

export interface Coordinates {
  roomId: string;
  imageId: string;
  position: Point;
}

export type SocketResCoordinates = Omit<Coordinates, 'roomId'>;
