import { privateClient } from '@/shared/api/config';

interface PostMomentJoinRequest {
  momentId: number;
}

export const postMomentJoin = async ({ momentId }: PostMomentJoinRequest) => {
  await privateClient.post(`/moment/${momentId}/join`);
};
