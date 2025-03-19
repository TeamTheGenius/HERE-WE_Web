import { publicClient } from '@/shared/api/config';

export const postAuthSignup = async (token: string, nickname: string) => {
  const { data: response } = await publicClient.post('/auth/signup', {
    token,
    nickname,
  });
  return {
    userId: response.data.userId,
  };
};
