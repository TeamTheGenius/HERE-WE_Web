import type { Location } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';
import { InfiniteScroll } from '@/shared/types/api';

export interface GetSearchLocationRequest {
  keyword: string;
  page: number;
  size: number;
}

interface GetSEarchLocationResponseContent {
  place_name: string;
  x: number;
  y: number;
  address_name: string;
  road_address_name: string;
  place_url: string;
  phone: string;
}

interface GetSarchLocationResponse extends InfiniteScroll<GetSEarchLocationResponseContent> {}

export const getSearchLocation = async ({
  keyword,
  page,
  size,
}: GetSearchLocationRequest): Promise<InfiniteScroll<Location>> => {
  const { data: response } = await privateClient.get('/search/location', {
    params: { keyword, page, size },
  });

  const { content, ...rest }: GetSarchLocationResponse = response.data;
  const clientContent: Location[] = content.map((item: GetSEarchLocationResponseContent) => ({
    placeName: item.place_name,
    x: item.x,
    y: item.y,
    addressName: item.address_name,
    roadAddressName: item.road_address_name,
    placeURL: item.place_url,
    phone: item.phone,
  }));

  return {
    ...rest,
    content: clientContent,
  };
};
