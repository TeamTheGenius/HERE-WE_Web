import { useEffect, useRef, useState } from 'react';

export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasLeftButton, setHasLeftButton] = useState(false);
  const [hasRightButton, setHasRightButton] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setHasLeftButton(scrollLeft > 0);
    setHasRightButton(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;
    const children = Array.from(container.children) as HTMLElement[];

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      const itemLeft = child.offsetLeft;
      const itemRight = itemLeft + child.offsetWidth;

      // 요소가 왼쪽에 걸쳐 있거나, 살짝이라도 보이면
      const isPartiallyVisible = itemLeft < scrollLeft && itemRight > scrollLeft;

      if (isPartiallyVisible) {
        container.scrollTo({
          left: itemRight - clientWidth,
          behavior: 'smooth',
        });
        return;
      }
    }

    // 부분적으로 보이는 요소가 없다면 한 페이지 만큼 이동
    container.scrollTo({
      left: scrollLeft - clientWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;
    const children = Array.from(container.children) as HTMLElement[];

    for (const child of children) {
      const itemLeft = child.offsetLeft;
      const itemRight = itemLeft + child.offsetWidth;

      const visibleRight = scrollLeft + clientWidth;

      // 요소가 오른쪽에 걸쳐 있거나, 살짝이라도 보이면
      const isPartiallyVisible = itemLeft < visibleRight && itemRight > visibleRight;

      if (isPartiallyVisible) {
        container.scrollTo({
          left: itemLeft,
          behavior: 'smooth',
        });
        return;
      }
    }

    // 부분적으로 보이는 요소가 없다면 한 페이지 만큼 이동
    container.scrollTo({
      left: scrollLeft + clientWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    handleScroll();

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    scrollLeft,
    scrollRight,
    hasLeftButton,
    hasRightButton,
    scrollRef,
    handleScroll,
  };
};
