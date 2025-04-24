import { PlaceCard } from '@/entities/Location/ui/PlaceCard';
import { MomentPlace } from '../../model/types';
import { PointerEvent } from 'react';
import Icon from '@/shared/ui/Icon';

interface MomentPlaceEditCardProps {
  handleClickPlace: (place: MomentPlace) => void;
  handleGrabPlace: (e: PointerEvent, index: number) => void;
  data: MomentPlace;
}

function MomentPlaceEditCard({ data, handleClickPlace, handleGrabPlace }: MomentPlaceEditCardProps) {
  const { placeName, index, roadAddressName, addressName, phone } = data;
  return (
    <PlaceCard>
      <PlaceCard.Header>
        <PlaceCard.Title handleClick={() => handleClickPlace(data)}>
          {index}. {placeName}
        </PlaceCard.Title>
        <PlaceCard.Buttons>
          <button style={{ touchAction: 'none' }} onPointerDown={(e) => handleGrabPlace(e, index)}>
            <Icon icon="grab" color="text-primary" iconSize="20" />
          </button>
        </PlaceCard.Buttons>
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
