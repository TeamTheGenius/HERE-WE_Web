import { privateClient } from '@/shared/api/config';
import { FileType } from '@/shared/types/api';

export interface GetProfileFileRequest {
  userId: number;
}

export const getProfileFile = async ({ userId }: GetProfileFileRequest): Promise<FileType> => {
  const { data: response } = await privateClient(`/file/${userId}`, {
    params: { type: 'profile' },
  });
  return {
    fileId: response.data.fileId,
    source: response.data.source,
    fileEnv: response.data.fileEnv,
  };
};
