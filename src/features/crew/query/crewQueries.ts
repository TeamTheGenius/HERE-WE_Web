import { queryOptions } from '@tanstack/react-query';
import { getMyCrewList, GetMyCrewListRequest, GetMyCrewListResponse } from '../api/getMyCrewList';
import { getCrewFile, GetCrewFileRequest } from '@/entities/crew/api/getCrewFile';

export const crewQueries = {
  allKeys: ['crew'] as const,
  myAllCrewKeys: ['myCrew'] as const,

  crewFile: ({ crewId }: GetCrewFileRequest) =>
    queryOptions({
      queryKey: [...crewQueries.allKeys, 'file', crewId],
      queryFn: () => getCrewFile({ crewId }),
    }),

  myCrewList: ({ page, size }: GetMyCrewListRequest) =>
    queryOptions<GetMyCrewListResponse>({
      queryKey: [...crewQueries.myAllCrewKeys, 'list', page, size],
      queryFn: () => getMyCrewList({ page, size }),
    }),
};
