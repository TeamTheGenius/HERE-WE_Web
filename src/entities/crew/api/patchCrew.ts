import { privateClient } from '@/shared/api/config';
import { CrewJSONMutationRequest, CrewJSONMutationResponse } from '../model/types';

export const patchCrew = async ({
  name,
  introduce,
  crewId,
}: CrewJSONMutationRequest): Promise<CrewJSONMutationResponse> => {
  const { data: response } = await privateClient.patch(`/crew/${crewId}`, {
    name,
    introduce,
  });
  return {
    crewId: response.data.crewId,
    name: response.data.name,
    participantCount: response.data.participantCount,
  };
};
