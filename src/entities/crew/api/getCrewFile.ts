import { privateClient } from '@/shared/api/config';
import { FileResponse } from '@/shared/types/api';

export interface GetCrewFileRequest {
  crewId: number;
}

export const getCrewFile = async ({ crewId }: GetCrewFileRequest): Promise<FileResponse> => {
  const { data: response } = await privateClient(`/file/${crewId}`, {
    params: { type: 'crew' },
  });

  return {
    fileId: response.data.fileId,
    source: response.data.source,
    fileEnv: response.data.fileEnv,
  };
};
