import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import { createImage } from '../utils/drawing/createImage';

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
);

interface ImageUploaderProps {
  setImages: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>;
}

export default function ImageUploader({ setImages }: ImageUploaderProps) {
  const params = useParams();
  const roomId = params.id;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<FilePondFile[]>([]);

  return (
    <>
      <FilePond
        onupdatefiles={setFiles}
        onprocessfile={(
          error: FilePondErrorDescription | null,
          file: FilePondFile,
        ) => {
          createImage(file, setImages);
        }}
        maxFileSize={'15MB'}
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
        dropOnPage={true}
        dropOnElement={false}
        allowMultiple={true}
        maxFiles={10}
        server={{
          url: `http://localhost:3000/api/rooms/${roomId}/image`,
          revert: (uniqueFileId, load, error) => {
            axios
              .delete(
                `http://localhost:3000/api/rooms/${roomId}/image/${uniqueFileId}`,
              )
              .then(() => {
                load();
              })
              .catch(() => {
                error('Delete failed!');
              });
          },
        }}
        name="images"
        labelIdle='Drag & drop images or <span class="filepond--label-action">select them from your device</span>.'
      />
    </>
  );
}
