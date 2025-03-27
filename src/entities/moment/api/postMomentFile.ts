import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { FileType } from '@/shared/types/api';

export interface PostMomentFileRequest {
  momentId: number;
  files: File[];
}

export const postMomentFile = async ({ momentId, files }: PostMomentFileRequest): Promise<FileType> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data: response } = await privateClient.post(`/file/${momentId}`, formData, {
    params: { type: 'moment' },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { fileId, source, fileEnv } = response.data;

  return {
    fileId: fileId,
    source: formatImageSource(fileEnv, source),
    fileEnv: fileEnv,
  };
};
