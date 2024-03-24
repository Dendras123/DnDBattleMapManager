import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useParams } from 'react-router-dom';
import axios from 'axios';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export default function ImageUploader() {
  const params = useParams();
  const roomId = params.id;

  return (
    <>
      <FilePond
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
