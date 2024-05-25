export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface UploadedImage {
  id: string;
  name: string;
  defaultPosition: Position;
  element: HTMLImageElement;
}

export interface SocketResImage {
  id: string;
  name: string;
  defaultPosition: Position;
  base64Image: string;
}

export interface Coordinates {
  roomId: string;
  imageId: string;
  position: Position;
}

export type SocketResCoordinates = Omit<Coordinates, 'roomId'>;
