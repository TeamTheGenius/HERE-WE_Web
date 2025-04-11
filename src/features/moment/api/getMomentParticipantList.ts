import { UserJson } from '@/entities/user/model/types';
import { privateClient } from '@/shared/api/config';
import { InfiniteScroll } from '@/shared/types/api';

export interface GetMomentParticipantListRequest {
  momentId: number;
  size: number;
  page: number;
}

export const getMomentParticipantList = async ({
  momentId,
  page,
  size,
}: GetMomentParticipantListRequest): Promise<InfiniteScroll<UserJson>> => {
  const { data: response } = await privateClient.get(`moment/${momentId}/members`, {
    params: {
      page: page,
      size: size,
    },
  });
  return response.data;
};
