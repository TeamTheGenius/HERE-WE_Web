import { publicClient } from '@/shared/api/config';
import { FileResponse } from '@/shared/types/api';

export const getAuthProfileImage = async (token: string): Promise<FileResponse> => {
  const { data: response } = await publicClient.get(`/auth/profile?token=${token}`);
  const { data } = response;
  const { fileEnv, fileId, source } = data;

  return {
    fileEnv: fileEnv,
    fileId: fileId,
    source: source,
  };
};
