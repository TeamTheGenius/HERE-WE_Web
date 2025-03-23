import { privateClient } from '@/shared/api/config';

interface DeleteCrewMemberRequest {
  crewId: number;
  nickname: string;
}

export const deleteCrewMember = async ({ crewId, nickname }: DeleteCrewMemberRequest) => {
  const { data: response } = await privateClient.delete(`/crew/${crewId}/members`, {
    params: { nickname: nickname },
  });
  return response.code === 'OK';
};
