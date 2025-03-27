import { useEffect, useRef } from 'react';

interface UseInfiniteScroll {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: UseInfiniteScroll) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const element = observerRef.current;
    if (!element) return;

    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return observerRef;
};
