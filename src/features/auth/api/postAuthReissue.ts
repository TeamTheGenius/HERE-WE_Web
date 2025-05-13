import { privateClient } from '@/shared/api/config';

export const postAuthReissue = async () => {
  await privateClient.post(`auth/reissue`);
};
