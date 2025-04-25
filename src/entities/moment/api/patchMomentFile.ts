import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { FileMutationRequest, FileType } from '@/shared/types/api';

export const patchMomentFile = async ({ id: momentId, files }: FileMutationRequest): Promise<FileType> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data: response } = await privateClient.patch(`/file/${momentId}`, formData, {
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
