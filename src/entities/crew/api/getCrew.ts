import { privateClient } from '@/shared/api/config';
import { CrewJSONType } from '../model/types';

export interface GetCrewRequest {
  crewId: number;
}

export const getCrew = async ({ crewId }: GetCrewRequest): Promise<CrewJSONType> => {
  const { data: response } = await privateClient.get(`/crew/${crewId}`);
  const { name, leaderName, role, introduce, participantCount } = response.data;

  return {
    crewId: crewId,
    name: name,
    leaderNickname: leaderName,
    role: role,
    introduce: introduce,
    participantCount: participantCount,
  };
};
