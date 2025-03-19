import { publicClient } from '@/shared/api/config';

export interface AuthProfileImageResponse {
  fileEnv: 'LOCAL' | 'CLOUD';
  fileId: number;
  source: string;
}

export const getAuthProfileImage = async (token: string): Promise<AuthProfileImageResponse> => {
  const { data: response } = await publicClient.get(`/auth/profile?token=${token}`);
  const { data } = response;
  const { fileEnv, fileId, source } = data;

  return {
    fileEnv: fileEnv,
    fileId: fileId,
    source: source,
  };
};
