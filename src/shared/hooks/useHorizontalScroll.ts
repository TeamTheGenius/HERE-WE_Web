import { useRef, useState } from 'react';

export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasLeftButton, setHasLeftButton] = useState(false);
  const [hasRightButton, setHasRightButton] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setHasLeftButton(scrollLeft > 0);
    setHasRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;

    scrollRef.current.scrollBy({
      left: -Math.max(clientWidth, itemWidth),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;

    scrollRef.current.scrollBy({
      left: Math.max(clientWidth, itemWidth),
      behavior: 'smooth',
    });
  };

  return {
    scrollLeft,
    scrollRight,
    hasLeftButton,
    hasRightButton,
    scrollRef,
    handleScroll,
  };
};
