import { getMyCrewList, GetMyCrewListRequest, GetMyCrewListResponse } from '../api/getMyCrewList';
import { queryOptions } from '@tanstack/react-query';

export const crewListQueries = {
  myAllCrewKeys: ['myCrew'] as const,
  myCrewsPagination: ({ page, size }: GetMyCrewListRequest) =>
    queryOptions<GetMyCrewListResponse>({
      queryKey: [...crewListQueries.myAllCrewKeys, 'list', page, size],
      queryFn: () => getMyCrewList({ page, size }),
    }),
};
