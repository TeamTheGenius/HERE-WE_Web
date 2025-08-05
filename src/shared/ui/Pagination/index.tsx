import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { PaginationHookReturn } from '@/shared/hooks/usePagination';

function Main({ children }: PropsWithChildren) {
  return <div className={styles.paginationContainer}>{children}</div>;
}

function PaginationContent({ children }: PropsWithChildren) {
  return <>{children}</>;
}

interface PaginationButtonProps extends PropsWithChildren {
  isActive?: boolean;
  isDisAbled?: boolean;
  handleClick?: () => void;
}

function PaginationButton({ isActive = false, isDisAbled = false, children, handleClick }: PaginationButtonProps) {
  return (
    <li>
      <button
        disabled={isDisAbled}
        onClick={handleClick}
        className={cn(
          {
            [styles.paginationButtonActive]: isActive && !isDisAbled,
            [styles.paginationButtonInactive]: !isActive && !isDisAbled,
            [styles.paginationButtonDisabled]: isDisAbled,
          },
          styles.paginationButton,
        )}
      >
        {children}
      </button>
    </li>
  );
}

interface PaginationProps {
  nextBlockChar?: string;
  prevBlockChar?: string;
  nextPageChar?: string;
  prevPageChar?: string;
  blockSize?: number;
  paginationTools: PaginationHookReturn;
  isVisible?: boolean;
}

function PaginationController({
  nextBlockChar = '...',
  prevBlockChar = '...',
  nextPageChar = '>',
  prevPageChar = '<',
  paginationTools,
  isVisible = true,
}: PaginationProps) {
  const {
    visiblePages,
    currentPage,
    minPage,
    maxPage,
    handleClickPrevPage,
    handleClickPrevPages,
    handleClickNextPage,
    handleClickNextPages,
    handleClickPage,
  } = paginationTools;

  if (!isVisible) return null;

  return (
    <ul className={styles.paginationController}>
      <PaginationButton key="prevPage" isDisAbled={currentPage === minPage} handleClick={handleClickPrevPage}>
        {prevPageChar}
      </PaginationButton>

      {visiblePages.map((page) => {
        if (page === 'prevBlock')
          return (
            <PaginationButton key="prevBlock" handleClick={handleClickPrevPages}>
              {prevBlockChar}
            </PaginationButton>
          );
        else if (page === 'nextBlock') {
          return (
            <PaginationButton key="nextBlock" handleClick={handleClickNextPages}>
              {nextBlockChar}
            </PaginationButton>
          );
        } else
          return (
            <PaginationButton isActive={page === currentPage} handleClick={() => handleClickPage(page)} key={page}>
              {page}
            </PaginationButton>
          );
      })}

      <PaginationButton key="nextPage" isDisAbled={currentPage === maxPage} handleClick={handleClickNextPage}>
        {nextPageChar}
      </PaginationButton>
    </ul>
  );
}

export const Pagination = Object.assign(Main, {
  Content: PaginationContent,
  Controller: PaginationController,
});
