import { useEffect, useRef, useState } from 'react';

export interface DragItem {
  index: number;
}

export interface DragAndDropOptions<T extends DragItem> {
  items: T[];
  onDrop: (originalIndex: number, newIndex: number) => Promise<void>;
  scrollContainerRef: React.RefObject<HTMLElement>;
  threshold?: number;
  scrollSpeed?: number;
  scrollEdgeThreshold?: number;
}

export function useDragAndDrop<T extends DragItem>({
  items,
  onDrop,
  scrollContainerRef,
  threshold = 5,
  scrollSpeed = 5,
  scrollEdgeThreshold = 40,
}: DragAndDropOptions<T>) {
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const draggedIndexRef = useRef<number | null>(null);
  const ghostRef = useRef<HTMLElement | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const scrollAnimationRef = useRef<number | null>(null);

  const checkDrag = (event: PointerEvent) => {
    const dx = event.pageX - dragStartPosRef.current.x;
    const dy = event.pageY - dragStartPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > threshold;
  };

  const createGhost = (draggedId: number) => {
    const draggedElement = itemRefs.current[draggedId];
    if (!draggedElement) return;

    const ghost = draggedElement.cloneNode(true) as HTMLElement;
    ghost.style.position = 'fixed';
    ghost.style.opacity = '0.8';
    ghost.style.zIndex = '1000';
    ghost.style.transform = 'translate(-50%, -50%)';
    ghost.style.width = `${draggedElement.offsetWidth}px`;

    document.body.appendChild(ghost);
    ghostRef.current = ghost;
  };

  const updateGhostPosition = (event: PointerEvent) => {
    if (!ghostRef.current) return;
    ghostRef.current.style.left = `${event.pageX}px`;
    ghostRef.current.style.top = `${event.pageY}px`;
  };

  const startScroll = (direction: 'up' | 'down') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scroll = () => {
      if (direction === 'up') container.scrollTop -= scrollSpeed;
      else container.scrollTop += scrollSpeed;

      scrollAnimationRef.current = requestAnimationFrame(scroll);
    };

    if (!scrollAnimationRef.current) {
      scrollAnimationRef.current = requestAnimationFrame(scroll);
    }
  };

  const stopScroll = () => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  const autoScroll = (event: PointerEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const offsetY = event.clientY - rect.top;
    const distanceToBottom = rect.bottom - event.clientY;

    if (offsetY < scrollEdgeThreshold) startScroll('up');
    else if (distanceToBottom < scrollEdgeThreshold) startScroll('down');
    else stopScroll();
  };

  const calculateInsertionIndex = (event: PointerEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      setInsertionIndex(null);
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const child = itemRefs.current[item.index];
      if (!child) continue;

      const childRect = child.getBoundingClientRect();
      if (event.clientY < childRect.top + childRect.height / 2) {
        return setInsertionIndex(item.index);
      }
    }

    const lastItem = items[items.length - 1];
    setInsertionIndex(lastItem.index + 1);
  };

  const reset = () => {
    draggedIndexRef.current = null;
    setInsertionIndex(null);

    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }

    stopScroll();
  };

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    draggedIndexRef.current = index;
    dragStartPosRef.current = { x: e.pageX, y: e.pageY };
  };

  const handlePointerMove = (event: PointerEvent) => {
    const draggedId = draggedIndexRef.current;
    if (draggedId == null) return;

    if (!ghostRef.current) {
      if (!checkDrag(event)) return;
      createGhost(draggedId);
    }

    updateGhostPosition(event);
    autoScroll(event);
    calculateInsertionIndex(event);
  };

  const handlePointerUp = async () => {
    if (!ghostRef.current) return reset();

    const draggedIndex = draggedIndexRef.current;
    if (draggedIndex == null || insertionIndex == null) return reset();

    const newIndex = draggedIndex < insertionIndex ? insertionIndex - 1 : insertionIndex;
    if (draggedIndex === newIndex) return reset();

    try {
      await onDrop(draggedIndex, newIndex);
    } finally {
      reset();
    }
  };

  const getItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[index] = el;
  };

  useEffect(() => {
    if (!items) return;

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [items, handlePointerMove, handlePointerUp]);

  return {
    insertionIndex,
    handlePointerDown,
    getItemRef,
  };
}
