import { LocationAboutServer } from '@/entities/Location/model/types';
import { privateClient } from '@/shared/api/config';
import { MomentJSONMutationRequest } from '../model/types';

export const postMoment = async ({
  crewId,
  momentName,
  meetAt,
  place,
  capacity,
  closedAt,
}: MomentJSONMutationRequest) => {
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

  const { data: response } = await privateClient.post(
    '/moment',
    {
      momentName: momentName,
      meetAt: meetAt,
      place: formattedPlace,
      capacity: capacity,
      closedAt: closedAt,
    },
    {
      params: { crewId },
    },
  );

  return {
    momentId: response.data.momentId,
  };
};
