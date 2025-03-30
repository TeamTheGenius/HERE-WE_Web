import { FormEvent, useRef } from 'react';
import styles from './index.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { locationListQueries } from '../../query/locationListQueries';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { TextInput } from '@/shared/ui/TextInput';
import { Card } from '@/shared/ui/Card';
import { Location } from '@/entities/Location/model/types';

export interface LocationSearchFormProps {
  handleSelectLocation: (location: Location) => void;
  handleSubmitKeyword: (keyword: string) => void;
  keyword: string;
}

function LocationSearchForm({ handleSelectLocation, keyword, handleSubmitKeyword }: LocationSearchFormProps) {
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
              const { placeName, roadAddressName, addressName, phone, id } = location;
              return (
                <ul key={id}>
                  <li>
                    <Card handleClick={() => handleSelectLocation(location)}>
                      <Card.Detail>{placeName}</Card.Detail>
                      <Card.Metadata>{roadAddressName}</Card.Metadata>
                      <Card.Metadata>{addressName}</Card.Metadata>
                      <Card.Metadata>{phone}</Card.Metadata>
                    </Card>
                    <u className={styles.underline} />
                  </li>
                </ul>
              );
            }),
          )}
        <div style={{ height: '1px' }} ref={observerRef} />
      </div>
    </div>
  );
}

export default LocationSearchForm;
