import { Pagination } from '@/shared/types/api';
import { Crew, getMyCrewList, GetMyCrewListRequest } from '../api/getMyCrewList';
import { queryOptions } from '@tanstack/react-query';
import { getMyCrewProfile, GetMyCrewProfileRequest } from '../api/getMyCrewProfile';
import { CrewProfile } from '../model/types';

export const crewFeatureQueries = {
  myAllCrewKeys: ['myCrew'] as const,
  myCrewsPagination: ({ page, size }: GetMyCrewListRequest) =>
    queryOptions<Pagination<Crew>>({
      queryKey: [...crewFeatureQueries.myAllCrewKeys, 'list', page, size],
      queryFn: () => getMyCrewList({ page, size }),
    }),
  myCrewProfile: ({ crewId }: GetMyCrewProfileRequest) =>
    queryOptions<CrewProfile>({
      queryKey: [...crewFeatureQueries.myAllCrewKeys, 'profile', crewId],
      queryFn: () => getMyCrewProfile({ crewId }),
    }),
};
