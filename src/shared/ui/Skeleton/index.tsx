import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './index.module.scss';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'rounded' | 'circle';
  width?: string;
  height?: string;
  animation?: 'pulse' | 'wave' | 'none';
  delay?: number;
}

function Skeleton({
  variant = 'rounded',
  width,
  height,
  animation = 'wave',
  delay = 200,
  className,
  ...rest
}: SkeletonProps) {
  const delayStyle = {
    '--skeleton-delay': `${delay}ms`,
  };

  return (
    <div
      className={cn(styles.skeleton, styles[`skeleton-${variant}`], styles[`skeleton-${animation}`], className)}
      style={{ width, height, ...delayStyle }}
      {...rest}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
