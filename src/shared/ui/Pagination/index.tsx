import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';

function Main({ children }: PropsWithChildren) {
  return <ul className={styles.pagination}>{children}</ul>;
}

interface PaginationButtonProps extends PropsWithChildren {
  isActive?: boolean;
}

function PaginationButton({ isActive = false, children }: PaginationButtonProps) {
  return (
    <li>
      <button
        className={cn(
          {
            [styles.paginationButtonActive]: isActive === true,
            [styles.paginationButtonInactive]: isActive === false,
          },
          styles.paginationButton,
        )}
      >
        {children}
      </button>
    </li>
  );
}

export const Pagination = Object.assign(Main, {
  Button: PaginationButton,
});
