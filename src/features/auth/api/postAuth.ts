import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';

export const postAuth = async (userId: number, token: string) => {
  const { data: response } = await privateClient.post(`auth`, {
    userId: userId,
    token: token,
  });

  const { nickname, fileResponse } = response.data;
  const { fileEnv, source } = fileResponse;
  const formattedProfileImage = formatImageSource(fileEnv, source);

  return {
    nickname,
    profileImage: formattedProfileImage,
  };
};
