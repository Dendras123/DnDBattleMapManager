import { useMutation } from 'react-query';
import axios from 'axios';

interface DeleteImageParams {
  roomId: string;
  imageId: string;
}

export default function useDeleteImage() {
  return useMutation({
    mutationFn: async ({ roomId, imageId }: DeleteImageParams) => {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/images/${imageId}/room/${roomId}`,
      );
    },
  });
}
