import { privateClient } from '@/shared/api/config';
import { CrewProfile } from '../model/types';

export interface GetMyCrewProfileRequest {
  crewId: number;
}

export const getMyCrewProfile = async ({ crewId }: GetMyCrewProfileRequest): Promise<CrewProfile> => {
  const { data: response } = await privateClient.get(`/crew/profile/${crewId}`);

  const { nickname, crewRole } = response.data;
  return {
    nickname: nickname,
    role: crewRole,
  };
};
