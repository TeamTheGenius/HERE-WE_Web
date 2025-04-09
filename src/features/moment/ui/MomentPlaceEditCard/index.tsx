import { PlaceCard } from '@/entities/Location/ui/PlaceCard';
import { MomentPlace } from '../../model/types';
import { useDeleteMomentPlace } from '../../query/useDeleteMomentPlace';
import { useParams } from 'react-router-dom';
import { PointerEvent } from 'react';

interface MomentPlaceEditCardProps {
  handleClickPlace: (place: MomentPlace) => void;
  handleGrabPlace: (e: PointerEvent, index: number) => void;
  data: MomentPlace;
}

function MomentPlaceEditCard({ data, handleClickPlace, handleGrabPlace }: MomentPlaceEditCardProps) {
  const { placeName, index, roadAddressName, addressName, phone } = data;

  const { mutateAsync: deletePlace } = useDeleteMomentPlace();
  const { momentId } = useParams();

  const handlePlaceDelete = async (index: number) => {
    await deletePlace({ momentId: Number(momentId), index });
  };

  return (
    <PlaceCard>
      <PlaceCard.Header>
        <PlaceCard.Title>{placeName}</PlaceCard.Title>
        <PlaceCard.Button onClick={() => handlePlaceDelete(index)}>삭제</PlaceCard.Button>
        <PlaceCard.Button onPointerDown={(e) => handleGrabPlace(e, index)}>grab</PlaceCard.Button>
      </PlaceCard.Header>
      <PlaceCard.Body handleClick={() => handleClickPlace(data)}>
        {roadAddressName && <PlaceCard.Detail>도로명: {roadAddressName}</PlaceCard.Detail>}
        {addressName && <PlaceCard.Detail>지번: {addressName}</PlaceCard.Detail>}
        {phone && <PlaceCard.Detail>연락처: {phone}</PlaceCard.Detail>}
      </PlaceCard.Body>
    </PlaceCard>
  );
}

export default MomentPlaceEditCard;
