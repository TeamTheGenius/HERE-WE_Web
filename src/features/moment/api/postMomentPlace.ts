import { Location, LocationAboutServer } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';

interface PostMomentPlaceRequest {
  momentId: number;
  place: Location;
}

export const postMomentPlace = async ({ momentId, place }: PostMomentPlaceRequest) => {
  const { placeName, placeURL, addressName, roadAddressName, phone, x, y, id } = place;

  const formattedPlace: LocationAboutServer = {
    place_name: placeName,
    place_url: placeURL,
    address_name: addressName,
    road_address_name: roadAddressName,
    phone: phone,
    id: id,
    x: x,
    y: y,
  };

  await privateClient.post(`/location/${momentId}`, { place: formattedPlace });
};
