import { privateClient } from '@/shared/api/config';

interface PostCrewJoinRequest {
  token: string;
}

interface PostCrewJoinResponse {
  crewId: number;
}

export const postCrewJoin = async ({ token }: PostCrewJoinRequest): Promise<PostCrewJoinResponse> => {
  const { data: response } = await privateClient.post(`/crew/invite/${token}`);

  return {
    crewId: response.data.crewId,
  };
};
