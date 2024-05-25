import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ImagesService } from 'src/images/image.service';
import {
  CoordinatesDto,
  ImageDto,
  UpdateScaleDto,
  UpdateZIndexDto,
} from 'src/images/image.types';
import { RoomsService } from 'src/rooms/room.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ImageEventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly imagesService: ImagesService,
  ) {}

  @SubscribeMessage('send-image')
  async sendImage(
    @MessageBody() data: ImageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const image = await this.imagesService.findOne(data.imageId);

    if (!image) {
      throw new Error(`Image with ID ${data.imageId} does not exist.`);
    }

    const base64Image = this.imagesService.readImageBase64(
      data.roomId,
      data.imageId,
      image.extension,
    );

    client.broadcast.to(data.roomId).emit('get-image', {
      id: data.imageId,
      name: image.name,
      defaultPosition: image.position,
      defaultScale: image.scale,
      base64Image: base64Image,
    });
  }

  @SubscribeMessage('send-coordinates')
  async sendCoordinates(
    @MessageBody() data: CoordinatesDto,
    @ConnectedSocket() client: Socket,
  ) {
    const image = await this.imagesService.saveCoordinates(data);

    client.broadcast.to(data.roomId).emit('get-coordinates', {
      imageId: data.imageId,
      position: image.position,
    });
  }

  @SubscribeMessage('send-delete-image-client')
  deleteImageFromClient(
    @MessageBody() data: ImageDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast
      .to(data.roomId)
      .emit('get-delete-image-client', data.imageId);
  }

  @SubscribeMessage('send-update-z-index')
  async sendUpdateZIndex(
    @MessageBody() data: UpdateZIndexDto,
    @ConnectedSocket() client: Socket,
  ) {
    const image = await this.imagesService.findOne(data.imageId);

    if (!image) {
      throw new Error(`Image with ID ${data.imageId} does not exist.`);
    }

    if (image.position.z === 0 && data.zIndexChange === -1) {
      return;
    }

    image.position.z += data.zIndexChange;
    this.imagesService.save(image);

    const coordinates = {
      imageId: data.imageId,
      position: image.position,
    };

    client.broadcast.to(data.roomId).emit('get-coordinates', coordinates);
    client.emit('get-coordinates', coordinates);
  }

  @SubscribeMessage('send-update-scale')
  async sendBringForward(
    @MessageBody() data: UpdateScaleDto,
    @ConnectedSocket() client: Socket,
  ) {
    const image = await this.imagesService.findOne(data.imageId);

    if (!image) {
      throw new Error(`Image with ID ${data.imageId} does not exist.`);
    }

    image.scale = data.scale;
    this.imagesService.save(image);

    client.broadcast.to(data.roomId).emit('get-update-scale', {
      imageId: data.imageId,
      scale: image.scale,
    });
  }
}
