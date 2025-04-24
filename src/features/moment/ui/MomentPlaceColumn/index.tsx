import { useParams } from 'react-router-dom';
import { Fragment, PointerEvent, useEffect, useRef, useState } from 'react';
import { MomentPlace } from '../../model/types';
import MomentPlaceEditCard from '../MomentPlaceEditCard';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';
import { usePatchMomentPlace } from '../../query/usePatchMomentPlace';
import { Location } from '@/entities/Location/model/types';

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
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const insertionIndexRef = useRef<number | null>(insertionIndex);

  const draggedIndexRef = useRef<number | null>(null);
  const ghostRef = useRef<HTMLElement | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const SCROLL_EDGE_THRESHOLD = 40;
  const SCROLL_SPEED = 10;

  useEffect(() => {
    insertionIndexRef.current = insertionIndex;
  }, [insertionIndex]);

  useEffect(() => {
    if (!places) return;

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const draggedId = draggedIndexRef.current;
      if (!draggedId) return;

      if (!isDraggingRef.current) {
        const dx = event.pageX - dragStartPosRef.current.x;
        const dy = event.pageY - dragStartPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 5) return;

        isDraggingRef.current = true;

        const draggedElement = itemRefs.current[draggedId];
        if (!draggedElement) return;

        const ghost = draggedElement.cloneNode(true) as HTMLElement;
        ghost.style.position = 'fixed';
        ghost.style.top = `${event.pageY}px`;
        ghost.style.left = `${event.pageX}px`;
        ghost.style.pointerEvents = 'none';
        ghost.style.opacity = '0.8';
        ghost.style.zIndex = '1000';
        ghost.style.transform = 'translate(-50%, -50%)';
        ghost.style.width = `${draggedElement.offsetWidth}px`;

        document.body.appendChild(ghost);
        ghostRef.current = ghost;
      }

      if (ghostRef.current) {
        ghostRef.current.style.left = `${event.pageX}px`;
        ghostRef.current.style.top = `${event.pageY}px`;
      }

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const offsetY = event.clientY - containerRect.top;
      const distanceToBottom = containerRect.bottom - event.clientY;

      // 자동 스크롤 로직
      if (offsetY < SCROLL_EDGE_THRESHOLD) {
        if (!scrollIntervalRef.current) {
          scrollIntervalRef.current = setInterval(() => {
            container.scrollTop -= SCROLL_SPEED;
          }, 16);
        }
      } else if (distanceToBottom < SCROLL_EDGE_THRESHOLD) {
        if (!scrollIntervalRef.current) {
          scrollIntervalRef.current = setInterval(() => {
            container.scrollTop += SCROLL_SPEED;
          }, 16);
        }
      } else {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
        }
      }

      if (
        event.clientX < containerRect.left ||
        event.clientX > containerRect.right ||
        event.clientY < containerRect.top ||
        event.clientY > containerRect.bottom
      ) {
        setInsertionIndex(null);
        return;
      }

      for (let i = 1; i < places.length; i++) {
        const place = places[i];
        const child = itemRefs.current[place.index];
        if (!child) continue;

        const rect = child.getBoundingClientRect();
        if (event.clientY < rect.top + rect.height / 2) {
          setInsertionIndex(place.index);
          return;
        }
      }

      const lastPlace = places[places.length - 1];
      setInsertionIndex(lastPlace.index + 1);
    };

    const handlePointerUp = async () => {
      if (!isDraggingRef.current) return reset();

      const draggedIndex = draggedIndexRef.current;
      const insertionIndex = insertionIndexRef.current;
      if (draggedIndex == null || insertionIndex == null) return reset();

      const newIndex = draggedIndex < insertionIndex ? insertionIndex - 1 : insertionIndex;
      if (draggedIndex === newIndex) return reset();

      reset();
      await patchMomentPlace({ momentId: Number(momentId), originalIndex: draggedIndex, newIndex: newIndex });
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [places]);

  const reset = () => {
    draggedIndexRef.current = null;
    setInsertionIndex(null);
    isDraggingRef.current = false;

    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }

    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handlePointerDown = (e: PointerEvent, index: number) => {
    e.preventDefault();
    draggedIndexRef.current = index;
    dragStartPosRef.current = { x: e.pageX, y: e.pageY };
  };

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
            <div ref={(el) => (itemRefs.current[place.index] = el)}>
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
