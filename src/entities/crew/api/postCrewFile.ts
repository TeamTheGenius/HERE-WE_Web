import { privateClient } from '@/shared/api/config';

export interface PostCrewFileRequest {
  crewId: number;
  files: File[];
}

export interface PostCrewFileResponse {
  fileId: number;
  source: string;
  fileEnv: 'LOCAL' | 'CLOUD';
}

export const postCrewFile = async ({ crewId, files }: PostCrewFileRequest): Promise<PostCrewFileResponse> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data: response } = await privateClient.post(`/file/${crewId}`, formData, {
    params: { type: 'crew' },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    fileId: response.data.fileId,
    source: response.data.source,
    fileEnv: response.data.fileEnv,
  };
};
