import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import Icon from '../Icon';
import { useHorizontalScroll } from '@/shared/hooks/useHorizontalScroll';

interface ScrollableRowProps extends PropsWithChildren {
  className?: string;
}

function ScrollableRow({ className, children }: ScrollableRowProps) {
  const { scrollLeft, scrollRef, scrollRight, hasLeftButton, hasRightButton } = useHorizontalScroll();

  return (
    <div className={styles.container}>
      <div ref={scrollRef} className={cn(styles.scrollableContainer, className)}>
        {children}
      </div>

      {hasLeftButton && (
        <button className={styles.leftButton} onClick={scrollLeft} aria-label="이전 항목 보기">
          <Icon icon="arrow" iconSize="28" color="text-primary" rotate={180} />
        </button>
      )}

      {hasRightButton && (
        <button className={styles.rightButton} onClick={scrollRight} aria-label="다음 항목 보기">
          <Icon icon="arrow" iconSize="28" color="text-primary" />
        </button>
      )}
    </div>
  );
}

export default ScrollableRow;
