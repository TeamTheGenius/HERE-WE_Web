import { useEffect, useRef, useState } from 'react';

export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<{ left: number; right: number; width: number }[]>([]);

  const [hasLeftButton, setHasLeftButton] = useState(false);
  const [hasRightButton, setHasRightButton] = useState(false);

  const updateOffsets = () => {
    const container = scrollRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    elementsRef.current = children.map((el) => ({
      left: el.offsetLeft,
      right: el.offsetLeft + el.offsetWidth,
      width: el.offsetWidth,
    }));
  };

  const findIndexByOffset = (offset: number) => {
    const elements = elementsRef.current;
    let start = 0;
    let end = elements.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const { left, right } = elements[mid];

      if (offset < left) {
        end = mid - 1;
      } else if (offset > right) {
        start = mid + 1;
      } else {
        return mid;
      }
    }
    return start < elements.length ? start : elements.length - 1;
  };

  const updateButtons = () => {
    const container = scrollRef.current;
    const elements = elementsRef.current;
    if (!container || elements.length === 0) return;

    const firstRect = elements[0];
    const lastRect = elements[elements.length - 1];

    const leftEdge = container.scrollLeft;
    const rightEdge = leftEdge + container.clientWidth;

    setHasLeftButton(firstRect.left < leftEdge);
    setHasRightButton(lastRect.right > rightEdge + 1);
  };

  const scrollToIndex = (targetIndex: number, align: 'left' | 'right') => {
    const container = scrollRef.current;
    const elements = elementsRef.current;
    if (!container || !elements[targetIndex]) return;

    const { left, right } = elements[targetIndex];
    const { clientWidth } = container;

    const scrollTo = align === 'left' ? left : right - clientWidth;

    container.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  const scrollByPage = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;
    const scrollTo = direction === 'right' ? scrollLeft + clientWidth : scrollLeft - clientWidth;

    container.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    const elements = elementsRef.current;
    if (!container || elements.length === 0) return;

    const { scrollLeft: leftEdge, clientWidth } = container;
    const index = findIndexByOffset(leftEdge);

    const cur = elements[index];
    const prev = elements[index - 1];

    if (cur.width > clientWidth) {
      return scrollByPage('left');
    }

    // gap 영역에 걸쳐 있는 경우: 이전 아이템으로 이동
    if (prev && prev.right < leftEdge && leftEdge < cur.left) {
      return scrollToIndex(index - 1, 'right');
    }

    // 현재 아이템이 정확히 경계에 있다면: 이전 아이템으로 이동
    if (cur.left === leftEdge) {
      return scrollToIndex(index - 1, 'right');
    }

    // 현재 아이템이 너무 커서 잘려있다면: 현재 아이템으로 이동
    if (cur.left < leftEdge) {
      return scrollToIndex(index, 'right');
    }

    // 나머지 경우
    return scrollByPage('left');
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    const elements = elementsRef.current;
    if (!container || elements.length === 0) return;

    const { scrollLeft, clientWidth } = container;
    const rightEdge = scrollLeft + clientWidth;
    const index = findIndexByOffset(rightEdge);

    const cur = elements[index];
    const next = elements[index + 1];

    if (cur.width > clientWidth) {
      return scrollByPage('right');
    }

    // gap 영역에 걸쳐 있는 경우: 다음 아이템으로 이동
    if (next && cur.right < rightEdge && rightEdge < next.left) {
      return scrollToIndex(index + 1, 'left');
    }

    // 현재 아이템이 정확히 경계에 있다면: 다음 아이템으로 이동
    if (cur.right === rightEdge) {
      return scrollToIndex(index + 1, 'left');
    }

    // 현재 아이템이 잘려 있다면: 현재 아이템으로 이동
    if (cur.right > rightEdge) {
      return scrollToIndex(index, 'left');
    }

    // 나머지 경우
    return scrollByPage('right');
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    updateButtons();
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateOffsets();
    updateButtons();

    container.addEventListener('scroll', handleScroll);
    const resizeObserver = new ResizeObserver(() => {
      updateButtons();
    });
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return {
    scrollLeft,
    scrollRight,
    hasLeftButton,
    hasRightButton,
    scrollRef,
  };
};
