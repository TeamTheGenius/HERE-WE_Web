import { Pagination } from '@/shared/types/api';
import { getCrewMomentList, GetCrewMomentListRequest } from '../api/getCrewMomentList';
import { queryOptions } from '@tanstack/react-query';
import { MomentJSONType } from '@/entities/moment/model/types';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { getMomentPlaces, GetMomentPlacesRequest } from '../api/getMomentPlaces';
import { getUpcomingMoments, GetUpcomingMomentsRequest } from '../api/getUpcomingMoments';

export const momentFeatureQueries = {
  crewMomentPagination: ({ page, size, crewId }: GetCrewMomentListRequest) =>
    queryOptions<Pagination<MomentJSONType>>({
      queryKey: [...momentQueries.allKeys, crewId, page, size],
      queryFn: () => getCrewMomentList({ crewId, page, size }),
    }),

  momentPlaces: ({ momentId }: GetMomentPlacesRequest) =>
    queryOptions({
      queryKey: [...momentQueries.allKeys, momentId],
      queryFn: () => getMomentPlaces({ momentId }),
    }),

  upcomingMomentsJSON: ({ page, size }: GetUpcomingMomentsRequest) =>
    queryOptions({
      queryKey: [...momentQueries.allKeys, 'json', page, size],
      queryFn: () => getUpcomingMoments({ page, size }),
    }),
};
