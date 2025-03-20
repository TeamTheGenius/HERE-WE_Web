import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { FileType } from '@/shared/types/api';

export interface GetProfileFileRequest {
  userId: number;
}

export const getProfileFile = async ({ userId }: GetProfileFileRequest): Promise<FileType> => {
  const { data: response } = await privateClient(`/file/${userId}`, {
    params: { type: 'profile' },
  });

  const { fileId, source, fileEnv } = response.data;

  return {
    fileId: fileId,
    source: formatImageSource(fileEnv, source),
    fileEnv: fileEnv,
  };
};
