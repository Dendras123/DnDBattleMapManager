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
        `http://localhost:3000/api/rooms/${roomId}/image/${imageId}`,
      );
    },
  });
}
