import { publicClient } from '@/shared/api/config';
import { FileType } from '@/shared/types/api';

export const getAuthProfileImage = async (token: string): Promise<FileType> => {
  const { data: response } = await publicClient.get(`/auth/profile?token=${token}`);
  const { data } = response;
  const { fileEnv, fileId, source } = data;

  return {
    fileEnv: fileEnv,
    fileId: fileId,
    source: source,
  };
};
