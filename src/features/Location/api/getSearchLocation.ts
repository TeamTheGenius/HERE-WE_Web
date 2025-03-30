import type { Location, LocationAboutServer } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';
import { InfiniteScroll } from '@/shared/types/api';

export interface GetSearchLocationRequest {
  keyword: string;
  page: number;
  size: number;
}

interface GetSarchLocationResponse extends InfiniteScroll<LocationAboutServer> {}

export const getSearchLocation = async ({
  keyword,
  page,
  size,
}: GetSearchLocationRequest): Promise<InfiniteScroll<Location>> => {
  const { data: response } = await privateClient.get('/search/location', {
    params: { keyword, page, size },
  });

  console.log(response.data);

  const { content, ...rest }: GetSarchLocationResponse = response.data;
  const clientContent: Location[] = content.map((item: LocationAboutServer) => ({
    id: item.id,
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
