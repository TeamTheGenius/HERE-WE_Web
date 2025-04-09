import { useParams } from 'react-router-dom';
import { momentFeatureQueries } from '../../query/momentFeatureQueries';
import { useQuery } from '@tanstack/react-query';
import { Fragment, PointerEvent, useEffect, useRef, useState } from 'react';
import { MomentPlace } from '../../model/types';
import MomentPlaceEditCard from '../MomentPlaceEditCard';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';

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
  handleClickPlace: (location: MomentPlace) => void;
}

function MomentPlaceColumn({ handleClickPlace }: MomentPlaceColumnProps) {
  const { momentId } = useParams();
  const { data } = useQuery({
    ...momentFeatureQueries.momentPlaces({ momentId: Number(momentId) }),
  });

  const [items, setItems] = useState<MomentPlace[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const insertionIndexRef = useRef<number | null>(insertionIndex);

  const draggedIdRef = useRef<number | null>(null);
  const ghostRef = useRef<HTMLElement | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    insertionIndexRef.current = insertionIndex;
  }, [insertionIndex]);

  useEffect(() => {
    if (data?.places) {
      setItems(data.places);
    }
  }, [data]);

  useEffect(() => {
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const draggedId = draggedIdRef.current;
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
      if (
        event.clientX < containerRect.left ||
        event.clientX > containerRect.right ||
        event.clientY < containerRect.top ||
        event.clientY > containerRect.bottom
      ) {
        setInsertionIndex(null);
        return;
      }

      for (let i = 0; i < items.length; i++) {
        const { index } = items[i];
        const child = itemRefs.current[index];
        if (!child) continue;

        const rect = child.getBoundingClientRect();
        if (event.clientY < rect.top + rect.height / 2) {
          setInsertionIndex(i);
          return;
        }
      }

      setInsertionIndex(items.length);
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return reset();

      const draggedId = draggedIdRef.current;
      const index = insertionIndexRef.current;

      if (draggedId == null || index == null) return reset();

      const draggedIndex = items.findIndex((item) => item.index === draggedId);
      if (draggedIndex === -1) return reset();

      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);

      let targetIndex = index;
      if (draggedIndex < index) targetIndex--;

      updatedItems.splice(targetIndex, 0, draggedItem);
      setItems(updatedItems);

      reset();
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [items]);

  const reset = () => {
    draggedIdRef.current = null;
    setInsertionIndex(null);
    isDraggingRef.current = false;

    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  };

  const handlePointerDown = (e: PointerEvent, index: number) => {
    draggedIdRef.current = index;
    dragStartPosRef.current = { x: e.pageX, y: e.pageY };
  };

  return (
    <div ref={containerRef}>
      {items.map((place, i) => {
        // 첫 번째 요소 (만남 장소)
        if (i === 0) {
          return (
            <article key={place.index}>
              <PlaceCard>
                <PlaceCard.Header>
                  <PlaceCard.Title>만남 장소: {place.placeName}</PlaceCard.Title>
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
            <InsertionLine isActive={insertionIndex === i} />
            <div ref={(el) => (itemRefs.current[place.index] = el)}>
              <MomentPlaceEditCard
                data={place}
                handleClickPlace={handleClickPlace}
                handleGrabPlace={handlePointerDown}
              />
            </div>
          </Fragment>
        );
      })}

      {/* 마지막 위치에 삽입선 */}
      <InsertionLine isActive={insertionIndex === items.length} />
    </div>
  );
}

export default MomentPlaceColumn;
