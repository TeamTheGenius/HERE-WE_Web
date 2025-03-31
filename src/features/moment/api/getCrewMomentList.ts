import { MomentJSONType } from '@/entities/moment/model/types';
import { privateClient } from '@/shared/api/config';
import { Pagination } from '@/shared/types/api';

export interface GetCrewMomentListRequest {
  crewId: number;
  size: number;
  page: number;
}

export const getCrewMomentList = async ({
  crewId,
  page,
  size,
}: GetCrewMomentListRequest): Promise<Pagination<MomentJSONType>> => {
  const { data: response } = await privateClient.get(`/moment/crew/${crewId}`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};
