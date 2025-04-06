import { privateClient } from '@/shared/api/config';

interface PostMomentPlaceRequest {
  momentId: number;
  index: number;
}

export const deleteMomentPlace = async ({ momentId, index }: PostMomentPlaceRequest) => {
  await privateClient.delete(`/location/${momentId}`, { params: { index } });
};
