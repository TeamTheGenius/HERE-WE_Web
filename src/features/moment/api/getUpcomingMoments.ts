import { privateClient } from '@/shared/api/config';
import { Pagination } from '@/shared/types/api';

export interface GetUpcomingMomentsRequest {
  page: number;
  size: number;
}

interface UpcomingMoment {
  momentId: number;
  crewName: string;
  momentName: string;
  meetAt: string;
  meetPlaceName: string;
}

export const getUpcomingMoments = async ({
  page,
  size,
}: GetUpcomingMomentsRequest): Promise<Pagination<UpcomingMoment>> => {
  const { data: response } = await privateClient.get('/moment', {
    params: { page, size },
  });

  return {
    page: response.data.page,
    content: response.data.content,
  };
};
