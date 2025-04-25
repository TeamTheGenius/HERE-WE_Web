import { Location } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';
import { MomentJSONQueryResponse } from '../model/types';

export interface GetMomentRequest {
  momentId: number;
}

export const getMoment = async ({ momentId }: GetMomentRequest): Promise<MomentJSONQueryResponse> => {
  const { data: response } = await privateClient.get(`/moment/${momentId}`);
  const { place_name, id, x, y, address_name, road_address_name, place_url, phone } = response.data.place;

  const formattedPlace: Location = {
    placeName: place_name,
    placeURL: place_url,
    addressName: address_name,
    roadAddressName: road_address_name,
    phone: phone,
    id: id,
    x: x,
    y: y,
  };

  return {
    ...response.data,
    place: formattedPlace,
  };
};
