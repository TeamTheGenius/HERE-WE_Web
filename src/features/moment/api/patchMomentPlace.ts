import { privateClient } from '@/shared/api/config';

interface PatchMomentPlaceRequest {
  momentId: number;
  originalIndex: number;
  newIndex: number;
}

export const patchMomentPlace = async ({ momentId, originalIndex, newIndex }: PatchMomentPlaceRequest) => {
  await privateClient.patch(`/location/${momentId}`, {
    originalIndex,
    newIndex,
  });
};
