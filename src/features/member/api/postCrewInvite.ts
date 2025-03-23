import { privateClient } from '@/shared/api/config';

interface PostCrewInviteRequest {
  crewId: number;
  nickname: string;
}

export const postCrewInvite = async ({ crewId, nickname }: PostCrewInviteRequest) => {
  const { data: response } = await privateClient.post('/crew/invite', {
    crewId: crewId,
    nickname: nickname,
  });

  return response.code == 'OK';
};
