import { privateClient } from '@/shared/api/config';
import { MomentPlace, MomentPlaces } from '../model/types';

export interface GetMomentPlacesRequest {
  momentId: number;
}

interface LocationInfoResponse {
  index: number;
  placeId: number;
  name: string;
  address: string;
  roadAddress: string;
  url: string;
  x: number;
  y: number;
  phone: string;
}

export const getMomentPlaces = async ({ momentId }: GetMomentPlacesRequest): Promise<MomentPlaces> => {
  const { data: response } = await privateClient.get(`/location/${momentId}`);
  const { locationInfos, ...rest } = response.data;

  const formattedLocationInfos = locationInfos.map((info: LocationInfoResponse): MomentPlace => {
    const { index, placeId, name, address, roadAddress, url, x, y, phone } = info;
    return {
      id: placeId,
      placeName: name,
      placeURL: url,
      addressName: address,
      roadAddressName: roadAddress,
      phone,
      index,
      x,
      y,
    };
  });

  return {
    ...rest,
    places: formattedLocationInfos,
  };
};
