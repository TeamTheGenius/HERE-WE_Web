import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';

interface ProfileNicknameProps extends PropsWithChildren {
  size: 'lg' | 'md' | 'sm';
  className?: string;
}

export function ProfileNickname({ children, size, className }: ProfileNicknameProps) {
  return (
    <span
      className={cn(
        {
          [styles.smallNickname]: size === 'sm',
          [styles.mediumNickname]: size === 'md',
          [styles.smallNickname]: size === 'sm',
        },
        styles.nickname,
        className,
      )}
    >
      {children}
    </span>
  );
}
