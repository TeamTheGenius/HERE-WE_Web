import { privateClient } from '@/shared/api/config';
import { FileType } from '@/shared/types/api';

export interface GetCrewFileRequest {
  crewId: number;
}

export const getCrewFile = async ({ crewId }: GetCrewFileRequest): Promise<FileType> => {
  const { data: response } = await privateClient(`/file/${crewId}`, {
    params: { type: 'crew' },
  });

  return {
    fileId: response.data.fileId,
    source: response.data.source,
    fileEnv: response.data.fileEnv,
  };
};
