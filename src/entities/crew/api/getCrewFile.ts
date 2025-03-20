import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { FileType } from '@/shared/types/api';

export interface GetCrewFileRequest {
  crewId: number;
}

export const getCrewFile = async ({ crewId }: GetCrewFileRequest): Promise<FileType> => {
  const { data: response } = await privateClient(`/file/${crewId}`, {
    params: { type: 'crew' },
  });

  const { fileId, source, fileEnv } = response.data;

  return {
    fileId: fileId,
    source: formatImageSource(fileEnv, source),
    fileEnv: fileEnv,
  };
};
