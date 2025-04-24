import { Location } from '@/entities/Location/model/types';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';

interface MomentPlaceAddCardProps {
  handleClickPlace: (place: Location) => void;
  data: Location;
}

function MomentPlaceAddCard({ handleClickPlace, data }: MomentPlaceAddCardProps) {
  const { placeName, roadAddressName, addressName, phone } = data;
  return (
    <PlaceCard>
      <PlaceCard.Header>
        <PlaceCard.Title handleClick={() => handleClickPlace(data)}>{placeName}</PlaceCard.Title>
      </PlaceCard.Header>
      <PlaceCard.Body handleClick={() => handleClickPlace(data)}>
        {roadAddressName && <PlaceCard.Detail>도로명: {roadAddressName}</PlaceCard.Detail>}
        {addressName && <PlaceCard.Detail>지번: {addressName}</PlaceCard.Detail>}
        {phone && <PlaceCard.Detail>연락처: {phone}</PlaceCard.Detail>}
      </PlaceCard.Body>
    </PlaceCard>
  );
}

export default MomentPlaceAddCard;
