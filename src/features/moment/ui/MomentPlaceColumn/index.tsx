import { Fragment, useEffect, useRef } from 'react';
import MomentPlaceEditCard from '../MomentPlaceEditCard';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';
import { usePatchMomentPlace } from '../../query/usePatchMomentPlace';
import { Location } from '@/entities/Location/model/types';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { useSuspenseQuery } from '@tanstack/react-query';
import { momentFeatureQueries } from '../../query/momentFeatureQueries';
import { MomentPlaces } from '../../model/types';

function InsertionLine({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={cn(
        {
          [styles.insertionLineActive]: isActive,
          [styles.insertionLineInactive]: !isActive,
        },
        styles.insertionLine,
      )}
    />
  );
}

interface MomentPlaceColumnProps {
  momentId: number;
  handleClickPlace: (place: Location) => void;
  handleLoadMomentPlaces: (momentPlaces: MomentPlaces) => void;
}

function MomentPlaceColumn({ handleClickPlace, momentId, handleLoadMomentPlaces }: MomentPlaceColumnProps) {
  const { data: places } = useSuspenseQuery({
    ...momentFeatureQueries.momentPlaces({ momentId }),
  });
  const { mutateAsync: patchMomentPlace } = usePatchMomentPlace();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrop = async (originalIndex: number, newIndex: number) => {
    await patchMomentPlace({
      momentId: Number(momentId),
      originalIndex,
      newIndex,
    });
  };

  const { insertionIndex, handlePointerDown, getItemRef } = useDragAndDrop({
    items: places.places,
    onDrop: handleDrop,
    scrollContainerRef: containerRef,
  });

  useEffect(() => {
    handleLoadMomentPlaces(places);
  }, [places]);

  if (!places || places.places.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      {places.places.map((place, i) => {
        // 첫 번째 요소 (만남 장소)
        if (i === 0) {
          return (
            <article key={place.index}>
              <PlaceCard>
                <PlaceCard.Header>
                  <PlaceCard.Title handleClick={() => handleClickPlace(place)}>
                    {place.index}. 만남 장소: {place.placeName}
                  </PlaceCard.Title>
                </PlaceCard.Header>
                <PlaceCard.Body handleClick={() => handleClickPlace(place)}>
                  {place.roadAddressName && <PlaceCard.Detail>도로명: {place.roadAddressName}</PlaceCard.Detail>}
                  {place.addressName && <PlaceCard.Detail>지번: {place.addressName}</PlaceCard.Detail>}
                  {place.phone && <PlaceCard.Detail>연락처: {place.phone}</PlaceCard.Detail>}
                </PlaceCard.Body>
              </PlaceCard>
            </article>
          );
        }

        // 나머지 요소 (드래그 가능)
        return (
          <Fragment key={place.index}>
            <InsertionLine isActive={insertionIndex === place.index} />
            <div ref={getItemRef(place.index)}>
              <MomentPlaceEditCard
                data={place}
                handleClickPlace={() => handleClickPlace(place)}
                handleGrabPlace={(e) => handlePointerDown(e, place.index)}
              />
            </div>
          </Fragment>
        );
      })}

      {/* 마지막 위치에 삽입선 */}
      <InsertionLine isActive={insertionIndex === places.places[places.places.length - 1].index + 1} />
    </div>
  );
}

export default MomentPlaceColumn;
