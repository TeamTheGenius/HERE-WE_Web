import { Pagination } from '@/shared/types/api';
import { Crew, getMyCrewList, GetMyCrewListRequest } from '../api/getMyCrewList';
import { queryOptions } from '@tanstack/react-query';

export const crewListQueries = {
  myAllCrewKeys: ['myCrew'] as const,
  myCrewsPagination: ({ page, size }: GetMyCrewListRequest) =>
    queryOptions<Pagination<Crew>>({
      queryKey: [...crewListQueries.myAllCrewKeys, 'list', page, size],
      queryFn: () => getMyCrewList({ page, size }),
    }),
};
