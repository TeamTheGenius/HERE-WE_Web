import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { FileType } from '@/shared/types/api';

export interface GetMomentFileRequest {
  momentId: number;
}

export const getMomentFile = async ({ momentId }: GetMomentFileRequest): Promise<FileType> => {
  const { data: response } = await privateClient(`/file/${momentId}`, {
    params: { type: 'moment' },
  });

  const { fileId, source, fileEnv } = response.data;

  return {
    fileId: fileId,
    source: formatImageSource(fileEnv, source),
    fileEnv: fileEnv,
  };
};
