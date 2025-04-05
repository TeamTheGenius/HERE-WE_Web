import { Pagination } from '@/shared/types/api';
import { getCrewMomentList, GetCrewMomentListRequest } from '../api/getCrewMomentList';
import { queryOptions } from '@tanstack/react-query';
import { MomentJSONType } from '@/entities/moment/model/types';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { getMomentPlaces, GetMomentPlacesRequest } from '../api/getMomentPlaces';
import { getUpcomingMoments, GetUpcomingMomentsRequest } from '../api/getUpcomingMoments';

export const momentFeatureQueries = {
  allListKeys: [...momentQueries.allKeys, 'list'] as const,
  allPlacesKeys: [...momentQueries.allKeys, 'place'] as const,

  crewMomentPaginationJSON: ({ page, size, crewId }: GetCrewMomentListRequest) =>
    queryOptions<Pagination<MomentJSONType>>({
      queryKey: [...momentFeatureQueries.allListKeys, crewId, page, size],
      queryFn: () => getCrewMomentList({ crewId, page, size }),
    }),
  upcomingMomentsJSON: ({ page, size }: GetUpcomingMomentsRequest) =>
    queryOptions({
      queryKey: [...momentFeatureQueries.allListKeys, 'json', page, size],
      queryFn: () => getUpcomingMoments({ page, size }),
    }),

  momentPlaces: ({ momentId }: GetMomentPlacesRequest) =>
    queryOptions({
      queryKey: [...momentFeatureQueries.allPlacesKeys, momentId],
      queryFn: () => getMomentPlaces({ momentId }),
    }),
};
