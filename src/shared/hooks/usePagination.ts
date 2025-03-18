import { useEffect, useState } from 'react';

type Page = number | 'nextBlock' | 'prevBlock';

export interface PaginationHookReturn {
  currentPage: number;
  visiblePages: Page[];
  minPage: number;
  maxPage: number;
  handleClickPage: (page: number) => void;
  handleClickPrevPage: () => void;
  handleClickNextPage: () => void;
  handleClickPrevPages: () => void;
  handleClickNextPages: () => void;
}

export const usePagination = (minPage: number, maxPage: number, blockSize: number = 6): PaginationHookReturn => {
  if (blockSize < 7) {
    throw new Error('blockSize는 7 이상이어야합니다.');
  }
  const END_BLOCK_SIZE = blockSize - 1;
  const MIDDLE_BLOCK_SIZE = blockSize - 4;

  const [currentPage, setCurrentPage] = useState(minPage);
  const [visiblePages, setVisiblePages] = useState<Page[]>([]);

  useEffect(() => {
    if (currentPage < minPage || currentPage > maxPage) return;
    setVisiblePages(getBlockPages());
  }, [currentPage, minPage, maxPage]);

  const getBlockPages = () => {
    if (maxPage <= blockSize) return getAllPages();
    if (currentPage <= minPage + MIDDLE_BLOCK_SIZE) return getFirstBlock();
    else if (currentPage >= maxPage - MIDDLE_BLOCK_SIZE) return getLastBlock();
    else return getMiddleBlock();
  };

  const getAllPages = (): Page[] => {
    // blockSize와 maxPage 같으면 [1,2,3,4,5,6] 반환
    return Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);
  };

  const getFirstBlock = (): Page[] => {
    // 🔹 minPage 근처 (ex. [1, 2, 3, 4, 5, ..., 51])
    const pages = Array.from({ length: Math.min(maxPage, END_BLOCK_SIZE - 1) }, (_, i) => minPage + i);
    if (maxPage - minPage > END_BLOCK_SIZE) return [...pages, 'nextBlock', maxPage];
    return pages;
  };

  const getLastBlock = (): Page[] => {
    // 🔹 maxPage 근처 (ex. [1, ...,47, 48, 49, 50, 51])
    const pages = Array.from({ length: END_BLOCK_SIZE - 1 }, (_, i) => maxPage - (END_BLOCK_SIZE - 2) + i);
    if (maxPage - minPage > END_BLOCK_SIZE) return [minPage, 'prevBlock', ...pages];
    return pages;
  };

  const getMiddleBlock = (): Page[] => {
    // 🔹 중간 페이지 (ex. [1, ..., 9, 10, 11, ..., 51])
    const start = Math.max(minPage, currentPage - Math.floor(MIDDLE_BLOCK_SIZE / 2));
    const end = Math.min(maxPage, currentPage + Math.floor(MIDDLE_BLOCK_SIZE / 2));
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return [minPage, 'prevBlock', ...pages, 'nextBlock', maxPage];
  };

  const handleClickPage = (page: number) => setCurrentPage(page);
  const handleClickPrevPage = () => setCurrentPage((prev) => Math.max(minPage, prev - 1));
  const handleClickNextPage = () => setCurrentPage((prev) => Math.min(maxPage, prev + 1));
  const handleClickPrevPages = () => {
    if (currentPage > maxPage - END_BLOCK_SIZE + 1) setCurrentPage(Math.max(minPage, maxPage - END_BLOCK_SIZE));
    else setCurrentPage((prev) => Math.max(minPage, prev - MIDDLE_BLOCK_SIZE));
  };
  const handleClickNextPages = () => {
    if (currentPage < minPage + END_BLOCK_SIZE - 1) setCurrentPage(Math.min(maxPage, minPage + END_BLOCK_SIZE));
    else setCurrentPage((prev) => Math.min(maxPage, prev + MIDDLE_BLOCK_SIZE));
  };

  return {
    currentPage,
    visiblePages,
    minPage,
    maxPage,
    handleClickPage,
    handleClickPrevPage,
    handleClickNextPage,
    handleClickPrevPages,
    handleClickNextPages,
  };
};
