import { InfiniteScroll, Pagination } from '@/shared/types/api';
import { getCrewMomentList, GetCrewMomentListRequest } from '../api/getCrewMomentList';
import { infiniteQueryOptions, QueryFunctionContext, queryOptions } from '@tanstack/react-query';
import { MomentJSONType } from '@/entities/moment/model/types';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { getMomentPlaces, GetMomentPlacesRequest } from '../api/getMomentPlaces';
import { getUpcomingMoments, GetUpcomingMomentsRequest } from '../api/getUpcomingMoments';
import { getMomentParticipantList, GetMomentParticipantListRequest } from '../api/getMomentParticipantList';
import { UserJson } from '@/entities/user/model/types';

export const momentFeatureQueries = {
  allListKeys: [...momentQueries.allKeys, 'list'] as const,
  allPlacesKeys: [...momentQueries.allKeys, 'place'] as const,
  allParticipantKeys: [...momentQueries.allKeys, 'participant'] as const,

  participantsInfiniteJSON: ({ page, size, momentId }: GetMomentParticipantListRequest) =>
    infiniteQueryOptions<InfiniteScroll<UserJson>>({
      queryKey: [...momentFeatureQueries.allParticipantKeys, momentId, page, size],
      queryFn: async ({ pageParam }: QueryFunctionContext) => {
        const currentPage = typeof pageParam === 'number' ? pageParam : 1;
        return await getMomentParticipantList({ page: currentPage, size, momentId });
      },
      initialPageParam: page,
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    }),

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
