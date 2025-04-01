import { privateClient } from '@/shared/api/config';
import { Pagination } from '@/shared/types/api';
import { UpcomingMomentJSON } from '../model/types';

export interface GetUpcomingMomentsRequest {
  page: number;
  size: number;
}

export const getUpcomingMoments = async ({
  page,
  size,
}: GetUpcomingMomentsRequest): Promise<Pagination<UpcomingMomentJSON>> => {
  const { data: response } = await privateClient.get('/moment', {
    params: { page, size },
  });

  return {
    page: response.data.page,
    content: response.data.content,
  };
};
