import { FormEvent, ReactNode, useRef } from 'react';
import styles from './index.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { locationListQueries } from '../../query/locationListQueries';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { TextInput } from '@/shared/ui/TextInput';
import { Location } from '@/entities/Location/model/types';
import { EmptyState } from '@/shared/ui/EmptyState';

export interface LocationSearchFormProps {
  handleSubmitKeyword: (keyword: string) => void;
  keyword: string;
  children: (location: Location) => ReactNode;
}

function LocationSearchForm({ keyword, handleSubmitKeyword, children }: LocationSearchFormProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...locationListQueries.searchLocationWithInfiniteScroll({ page: 0, size: 15, keyword: keyword }),
    enabled: keyword.trim().length > 0,
  });

  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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

      {!data?.pages[0]?.content?.length && (
        <EmptyState>
          <EmptyState.Icon icon="search" iconSize="40" />
          <EmptyState.Description>검색 결과가 없습니다</EmptyState.Description>
        </EmptyState>
      )}

      <div className={styles.searchResult} ref={rootRef}>
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

        <div style={{ height: '1px' }} ref={targetRef} />
      </div>
    </div>
  );
}

export default LocationSearchForm;
