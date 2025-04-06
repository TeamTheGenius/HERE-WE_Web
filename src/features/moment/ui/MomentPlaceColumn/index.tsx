import styles from './index.module.scss';
import { Location } from '@/entities/Location/model/types';
import { useParams } from 'react-router-dom';
import { momentFeatureQueries } from '../../query/momentFeatureQueries';
import { useQuery } from '@tanstack/react-query';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';

interface MomentPlaceColumnProps {
  handleDeleteLocation: (location: Location) => void;
  handleClickLocation: (location: Location) => void;
}

function MomentPlaceColumn({ handleDeleteLocation, handleClickLocation }: MomentPlaceColumnProps) {
  const { momentId } = useParams();
  const { data } = useQuery({ ...momentFeatureQueries.momentPlaces({ momentId: Number(momentId) }) });

  if (!data) return null;

  return (
    <>
      {data.places.map((place, index) => {
        const { placeName, roadAddressName, addressName, phone, id } = place;

        const isMeetPlace = index === 0;

        return (
          <article key={id}>
            <PlaceCard>
              <PlaceCard.Header>
                <PlaceCard.Title>
                  {isMeetPlace && '만남 장소: '}
                  {placeName}
                </PlaceCard.Title>
                {!isMeetPlace && (
                  <PlaceCard.Button handleClick={() => handleDeleteLocation(place)}>삭제</PlaceCard.Button>
                )}
              </PlaceCard.Header>
              <PlaceCard.Body handleClick={() => handleClickLocation(place)}>
                {roadAddressName && <PlaceCard.Detail>도로명: {roadAddressName}</PlaceCard.Detail>}
                {addressName && <PlaceCard.Detail>지번: {addressName}</PlaceCard.Detail>}
                {phone && <PlaceCard.Detail>연락처: {phone}</PlaceCard.Detail>}
              </PlaceCard.Body>
            </PlaceCard>
            <u className={styles.underline} />
          </article>
        );
      })}
    </>
  );
}

export default MomentPlaceColumn;
