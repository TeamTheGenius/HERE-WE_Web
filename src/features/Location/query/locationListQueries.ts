import { InfiniteScroll } from '@/shared/types/api';
import { getSearchLocation, GetSearchLocationRequest } from '../api/getSearchLocation';
import { Location } from '@/entities/Location/model/types';
import { locationQueries } from '@/entities/Location/query/locationQueries';
import { infiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';

export const locationListQueries = {
  searchLocationWithInfiniteScroll: ({ page, size, keyword }: GetSearchLocationRequest) =>
    infiniteQueryOptions<InfiniteScroll<Location>>({
      queryKey: [...locationQueries.allKeys, keyword, size],
      queryFn: async ({ pageParam }: QueryFunctionContext) => {
        const currentPage = typeof pageParam === 'number' ? pageParam : 1;
        return await getSearchLocation({ page: currentPage, size, keyword });
      },
      initialPageParam: page,
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
      staleTime: Infinity, // map api 결과는 자주 변경되지 않기 때문
    }),
};
