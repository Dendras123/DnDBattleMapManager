import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import { createImage, deleteImage } from '../utils/drawing/manageImage';
import { UploadedImage } from '../types/imageTypes';
import useDeleteImage from '../hooks/mutations/useDeleteImage';
import { socket } from '../utils/socket/socketInstance';

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
);

interface ImageUploaderProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  const params = useParams();
  const roomId = params.id ?? '0';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const deleteImageMutation = useDeleteImage();

  return (
    <>
      <FilePond
        onupdatefiles={setFiles}
        onprocessfile={(
          error: FilePondErrorDescription | null,
          file: FilePondFile,
        ) => {
          createImage(file, roomId, setImages);
        }}
        maxFileSize={'15MB'}
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
        dropOnPage={true}
        dropOnElement={false}
        allowMultiple={true}
        maxFiles={10}
        server={{
          url: `http://localhost:3000/api/images/room/${roomId}`,
          revert: (uniqueFileId, load, error) => {
            const image = images.find((img) => img.id === uniqueFileId);

            if (!image) {
              error('Image does not exist');
              return;
            }

            deleteImageMutation.mutate(
              {
                roomId: roomId,
                imageId: image.id,
              },
              {
                onError: () => error('Delete failed!'),
                onSuccess: () => load(),
              },
            );
            deleteImage(image.element.src, image.id, setImages);
            // delete image from other clients
            socket.emit('send-delete-image-client', {
              roomId: roomId,
              imageId: image.id,
            });
          },
        }}
        name="images"
        labelIdle='Drag & drop images or <span class="filepond--label-action">select them from your device</span>.'
      />
    </>
  );
}
