import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll<
  RootElement extends HTMLElement = HTMLDivElement,
  TargetElement extends HTMLElement = HTMLDivElement,
>(props: UseInfiniteScrollProps) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, threshold = 0.3, rootMargin = '0px' } = props;

  const rootRef = useRef<RootElement>(null);
  const targetRef = useRef<TargetElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const root = rootRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold, rootMargin]);

  return { rootRef, targetRef };
}
