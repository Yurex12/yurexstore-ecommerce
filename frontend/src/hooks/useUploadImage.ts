import { getImagekitAuthParams } from '@/services/imagekit';
import { upload } from '@imagekit/react';
import toast from 'react-hot-toast';

export function useUploadImage() {
  async function uploadImage(image: File, folderName: string) {
    try {
      const authParams = await getImagekitAuthParams();
      if (!authParams) {
        toast.error('Something went wrong');
        return null;
      }

      const uploadResponse = await upload({
        ...authParams,
        file: image,
        fileName: image.name,
        folder: folderName,
      });

      if (!uploadResponse.url || !uploadResponse.fileId) {
        toast.error('Something went wrong');
        return null;
      }

      return { url: uploadResponse.url, fileId: uploadResponse.fileId };
    } catch {
      toast.error('Something went wrong');
      return null;
    }
  }

  return { uploadImage };
}
