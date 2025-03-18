import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { PaginationHookReturn } from '@/shared/hooks/usePagination';

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
}

function Pagination({
  nextBlockChar = '...',
  prevBlockChar = '...',
  nextPageChar = '>',
  prevPageChar = '<',
  paginationTools,
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

  return (
    <ul className={styles.pagination}>
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

export default Pagination;
