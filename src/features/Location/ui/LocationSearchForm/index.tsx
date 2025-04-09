import { FormEvent, ReactNode, useRef } from 'react';
import styles from './index.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { locationListQueries } from '../../query/locationListQueries';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { TextInput } from '@/shared/ui/TextInput';
import { Location } from '@/entities/Location/model/types';

export interface LocationSearchFormProps {
  handleSubmitKeyword: (keyword: string) => void;
  keyword: string;
  children: (location: Location) => ReactNode;
}

function LocationSearchForm({ keyword, handleSubmitKeyword, children }: LocationSearchFormProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...locationListQueries.searchLocationWithInfiniteScroll({ page: 0, size: 15, keyword: keyword }),
    enabled: keyword.trim().length > 0,
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    root: searchResultRef.current,
  });

  const handleSearchLocation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = searchInputRef?.current?.value;
    if (!keyword) return;
    handleSubmitKeyword(keyword);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearchLocation} className={styles.searchForm}>
        <TextInput>
          <TextInput.Label isVisible={false}>장소 검색</TextInput.Label>
          <TextInput.Input
            defaultValue={keyword}
            type="search"
            placeholder="장소를 검색해주세요"
            ref={searchInputRef}
          />
        </TextInput>
      </form>

      <div className={styles.searchResult} ref={searchResultRef}>
        {data &&
          data.pages.map((page) =>
            page.content.map((location) => {
              return (
                <>
                  {children(location)}
                  <u className={styles.underline} />
                </>
              );
            }),
          )}

        <div style={{ height: '1px' }} ref={observerRef} />
      </div>
    </div>
  );
}

export default LocationSearchForm;
