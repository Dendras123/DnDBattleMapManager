import { useMutation } from 'react-query';
import { dataURLtoFile } from '../utils/dataTransfromation/Base64Helpers';
import axios from 'axios';

interface SaveStateParams {
  dataUrl: string;
  fileName: string;
}

export default function useSaveState() {
  return useMutation({
    mutationFn: async ({ dataUrl, fileName }: SaveStateParams) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      await axios.post(
        'http://localhost:3000/api/rooms/save-state',
        { image: dataURLtoFile(dataUrl, fileName) },
        config,
      );
    },
  });
}
