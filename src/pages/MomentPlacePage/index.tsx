import MomentPlaceMap from '@/features/map/ui/MomentPlaceMap';
import styles from './index.module.scss';
import { Suspense, useEffect, useState } from 'react';
import LocationSearchForm from '@/features/Location/ui/LocationSearchForm';
import MomentPlaceColumn from '@/features/moment/ui/MomentPlaceColumn';
import MomentPlaceAddCard from '@/features/moment/ui/MomentPlaceAddCard';
import { InfiniteData } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Tab } from '@/shared/ui/Tab';
import { Location } from '@/entities/Location/model/types';
import { MomentPlace, MomentPlaces } from '@/features/moment/model/types';
import { InfiniteScroll } from '@/shared/types/api';
import MomentPlaceTitle from '@/entities/moment/ui/MomentPlaceTitle';
import Skeleton from '@/shared/ui/Skeleton';
import CardListSkeleton from '@/shared/ui/CardListSkeleton';

function MomentPlacePage() {
  const { momentId } = useParams();

  const [keyword, setKeyword] = useState<string>('');
  const [momentPlaces, setMomentPlaces] = useState<MomentPlaces>();
  const [searchResult, setSearchResult] = useState<InfiniteData<InfiniteScroll<Location>>>();
  const [focus, setFocus] = useState<Location | MomentPlace | undefined>(momentPlaces?.places?.[0]);
  const firstSearchResult = searchResult?.pages[0].content[0];

  const submitKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const searchPlace = (places: InfiniteData<InfiniteScroll<Location>>) => {
    setSearchResult(places);
  };

  const updateMomentPlaces = (momentPlaces: MomentPlaces) => {
    setMomentPlaces(momentPlaces);
  };

  const focusPlace = (place: Location | MomentPlace) => {
    setFocus(place);
  };

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        if (momentPlaces?.places?.[0]) setFocus(momentPlaces.places[0]);
        break;
      case 1:
        if (firstSearchResult) setFocus(firstSearchResult);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (firstSearchResult) setFocus(firstSearchResult);
  }, [firstSearchResult]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Suspense fallback={<Skeleton variant="rect" width="16rem" height="1.6rem" />}>
          <MomentPlaceTitle momentId={Number(momentId)} />
        </Suspense>
      </div>
      <main className={styles.contentContainer}>
        <section className={styles.locationSection}>
          <Tab handleTabChange={handleTabChange}>
            <Tab.TriggerList>
              <Tab.Trigger index={0}>방문 장소</Tab.Trigger>
              <Tab.Trigger index={1}>검색</Tab.Trigger>
            </Tab.TriggerList>
            <Tab.Panel index={0}>
              <Suspense fallback={<CardListSkeleton direction="vertical" />}>
                <MomentPlaceColumn
                  momentId={Number(momentId)}
                  handleClickPlace={focusPlace}
                  handleLoadMomentPlaces={updateMomentPlaces}
                />
              </Suspense>
            </Tab.Panel>
            <Tab.Panel index={1}>
              <LocationSearchForm keyword={keyword} handleSubmitKeyword={submitKeyword} handleSearchPlace={searchPlace}>
                {(location) => <MomentPlaceAddCard handleClickPlace={focusPlace} data={location} />}
              </LocationSearchForm>
            </Tab.Panel>
          </Tab>
        </section>
        <section className={styles.mapWrapper}>
          <MomentPlaceMap searchPlaces={searchResult} momentPlaces={momentPlaces?.places || []} focus={focus} />
        </section>
      </main>
    </div>
  );
}

export default MomentPlacePage;
