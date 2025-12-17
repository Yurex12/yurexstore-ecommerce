import { getImagekitAuthParams } from '@/services/imagekit';
import { upload } from '@imagekit/react';

export function useUploadImage() {
  async function uploadImage(image: File, folderName: string) {
    try {
      const authParams = await getImagekitAuthParams();
      if (!authParams) {
        return null;
      }

      const uploadResponse = await upload({
        ...authParams,
        file: image,
        fileName: image.name,
        folder: folderName,
      });

      if (!uploadResponse.url || !uploadResponse.fileId) {
        return null;
      }

      return { url: uploadResponse.url, fileId: uploadResponse.fileId };
    } catch {
      return null;
    }
  }

  return { uploadImage };
}
