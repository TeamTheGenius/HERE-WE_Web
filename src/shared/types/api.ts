export type FileEnvType = 'LOCAL' | 'CLOUD';
export interface FileType {
  fileId: number;
  source: string;
  fileEnv: FileEnvType;
}

export interface InfiniteScroll<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}
