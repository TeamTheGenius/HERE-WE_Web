import { privateClient } from '@/shared/api/config';

interface PostMomentJoinRequest {
  momentId: number;
}

export const deleteMomentJoin = async ({ momentId }: PostMomentJoinRequest) => {
  await privateClient.delete(`/moment/${momentId}/join`);
};
