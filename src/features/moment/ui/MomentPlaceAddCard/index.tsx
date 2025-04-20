import { Location } from '@/entities/Location/model/types';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';
import { usePostMomentPlace } from '../../query/usePostMomentPlace';
import { useParams } from 'react-router-dom';
import { useAddToast } from '@/shared/hooks/useToast';

interface MomentPlaceAddCardProps {
  handleClickPlace: (location: Location) => void;
  data: Location;
}

function MomentPlaceAddCard({ handleClickPlace, data }: MomentPlaceAddCardProps) {
  const { momentId } = useParams();
  const { mutateAsync: addPlace } = usePostMomentPlace();
  const addToast = useAddToast();

  const handlePlaceAdd = async (place: Location) => {
    await addPlace({ place, momentId: Number(momentId) });

    addToast({
      type: 'success',
      message: `'${place.placeName}'을(를) 추가했어요`,
    });
  };

  const { placeName, roadAddressName, addressName, phone } = data;
  return (
    <PlaceCard>
      <PlaceCard.Header>
        <PlaceCard.Title>{placeName}</PlaceCard.Title>
        <PlaceCard.Button onClick={() => handlePlaceAdd(data)}>추가</PlaceCard.Button>
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
