import { FormEvent, useRef } from 'react';
import styles from './index.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { locationListQueries } from '../../query/locationListQueries';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { TextInput } from '@/shared/ui/TextInput';
import { Location } from '@/entities/Location/model/types';
import { PlaceCard } from '@/entities/Location/ui/PlaceCard';

export interface LocationSearchFormProps {
  handleAddLocation: (location: Location) => void;
  handleClickLocation: (location: Location) => void;
  handleSubmitKeyword: (keyword: string) => void;
  keyword: string;
}

function LocationSearchForm({
  handleAddLocation,
  keyword,
  handleSubmitKeyword,
  handleClickLocation,
}: LocationSearchFormProps) {
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
                <article key={id}>
                  <PlaceCard>
                    <PlaceCard.Header>
                      <PlaceCard.Title>{placeName}</PlaceCard.Title>
                      <PlaceCard.Button handleClick={() => handleAddLocation(location)}>추가</PlaceCard.Button>
                    </PlaceCard.Header>
                    <PlaceCard.Body handleClick={() => handleClickLocation(location)}>
                      {roadAddressName && <PlaceCard.Detail>도로명: {roadAddressName}</PlaceCard.Detail>}
                      {addressName && <PlaceCard.Detail>지번: {addressName}</PlaceCard.Detail>}
                      {phone && <PlaceCard.Detail>연락처: {phone}</PlaceCard.Detail>}
                    </PlaceCard.Body>
                  </PlaceCard>
                  <u className={styles.underline} />
                </article>
              );
            }),
          )}

        <div style={{ height: '1px' }} ref={observerRef} />
      </div>
    </div>
  );
}

export default LocationSearchForm;
