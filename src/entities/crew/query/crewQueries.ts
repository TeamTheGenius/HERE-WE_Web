import { queryOptions } from '@tanstack/react-query';
import { getMyCrewList, GetMyCrewListRequest, GetMyCrewListResponse } from '../../../features/crew/api/getMyCrewList';
import { getCrewFile, GetCrewFileRequest } from '@/entities/crew/api/getCrewFile';
import { getCrew, GetCrewRequest } from '../api/getCrew';

export const crewQueries = {
  allKeys: ['crew'] as const,
  myAllCrewKeys: ['myCrew'] as const,

  crewFile: ({ crewId }: GetCrewFileRequest) =>
    queryOptions({
      queryKey: [...crewQueries.allKeys, 'file', crewId],
      queryFn: () => getCrewFile({ crewId }),
    }),

  crewJSON: ({ crewId }: GetCrewRequest) =>
    queryOptions({
      queryKey: [...crewQueries.allKeys, 'json', crewId],
      queryFn: () => getCrew({ crewId }),
    }),

  myCrewsPagination: ({ page, size }: GetMyCrewListRequest) =>
    queryOptions<GetMyCrewListResponse>({
      queryKey: [...crewQueries.myAllCrewKeys, 'list', page, size],
      queryFn: () => getMyCrewList({ page, size }),
    }),
};
