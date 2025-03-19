import { privateClient } from '@/shared/api/config';

export interface PostCrewRequest {
  name: string;
  introduce: string;
}

export interface PostCrewResponse {
  crewId: number;
  name: string;
  participantCount: number;
}

export const postCrew = async ({ name, introduce }: PostCrewRequest): Promise<PostCrewResponse> => {
  const { data: response } = await privateClient.post('/crew', {
    name,
    introduce,
  });
  return {
    crewId: response.data.crewId,
    name: response.data.name,
    participantCount: response.data.participantCount,
  };
};
