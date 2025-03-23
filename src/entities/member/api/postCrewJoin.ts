import { privateClient } from '@/shared/api/config';

interface PostCrewJoinRequest {
  token: string;
}

export const postCrewJoin = async ({ token }: PostCrewJoinRequest) => {
  const { data: response } = await privateClient.post(`/crew/invite/${token}`);
  return response.code === 'OK';
};
