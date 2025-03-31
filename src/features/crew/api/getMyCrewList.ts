import { privateClient } from '@/shared/api/config';
import { Pagination } from '@/shared/types/api';

export interface GetMyCrewListRequest {
  size: number;
  page: number;
}

export interface Crew {
  crewId: number;
  name: string;
  participantCount: number;
}

export const getMyCrewList = async ({ size, page }: GetMyCrewListRequest): Promise<Pagination<Crew>> => {
  const { data: response } = await privateClient.get('/crew/my', {
    params: {
      page: page,
      size: size,
    },
  });

  return {
    content: response.data.content,
    page: response.data.page,
  };
};
