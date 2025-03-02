import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';

interface ScrollbaleRow extends PropsWithChildren {
  className?: string;
}

function ScrollableRow({ className, children }: ScrollbaleRow) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default ScrollableRow;
