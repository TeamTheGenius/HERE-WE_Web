import { Location, LocationAboutServer } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';

interface PatchMomentRequest {
  momentId: number;
  momentName: string;
  meetAt: string;
  place: Location;
  capacity: number;
  closedAt: string;
}

export const patchMoment = async ({ momentId, momentName, meetAt, place, capacity, closedAt }: PatchMomentRequest) => {
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

  const { data: response } = await privateClient.patch(`/moment/${momentId}`, {
    momentName: momentName,
    meetAt: meetAt,
    place: formattedPlace,
    capacity: capacity,
    closedAt: closedAt,
  });

  return {
    momentId: response.data.momentId,
  };
};
