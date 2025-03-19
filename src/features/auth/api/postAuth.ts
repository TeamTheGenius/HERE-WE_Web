import { privateClient } from '@/shared/api/config';

export const postAuth = async (userId: number) => {
  await privateClient.post(`auth`, {
    userId: userId,
  });
};
