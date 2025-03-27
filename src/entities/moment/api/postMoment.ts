import { Location } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';

interface PostMomentRequest {
  crewId: number;
  momentName: string;
  meetAt: string;
  place: Location;
  capacity: number;
  closedAt: string;
}

export const postMoment = async ({ crewId, momentName, meetAt, place, capacity, closedAt }: PostMomentRequest) => {
  const { data: response } = await privateClient.post(
    '/moment',
    {
      momentName: momentName,
      meetAt: meetAt,
      place: place,
      capacity: capacity,
      closedAt: closedAt,
    },
    {
      params: { crewId },
    },
  );

  return {
    momentId: response.data.momentId,
  };
};
