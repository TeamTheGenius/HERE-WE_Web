import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';

export const postAuth = async (userId: number) => {
  const { data: response } = await privateClient.post(`auth`, {
    userId: userId,
  });

  const { nickname, fileResponse } = response.data;
  const { fileEnv, source } = fileResponse;
  const formattedProfileImage = formatImageSource(fileEnv, source);

  return {
    nickname,
    profileImage: formattedProfileImage,
  };
};
