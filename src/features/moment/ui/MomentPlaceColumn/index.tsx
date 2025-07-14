import { useParams } from 'react-router-dom';
import { Fragment, useRef } from 'react';
import { MomentPlace } from '../../model/types';
import MomentPlaceEditCard from '../MomentPlaceEditCard';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';
import { usePatchMomentPlace } from '../../query/usePatchMomentPlace';
import { Location } from '@/entities/Location/model/types';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';

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
  handleClickPlace: (place: Location) => void;
  places: MomentPlace[];
}

function MomentPlaceColumn({ handleClickPlace, places }: MomentPlaceColumnProps) {
  const { momentId } = useParams();

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
    items: places,
    onDrop: handleDrop,
    scrollContainerRef: containerRef,
  });

  if (!places || places.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      {places.map((place, i) => {
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
      <InsertionLine isActive={insertionIndex === places[places.length - 1].index + 1} />
    </div>
  );
}

export default MomentPlaceColumn;
