import MomentPlaceMap from '@/features/map/ui/MomentPlaceMap';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import LocationSearchForm from '@/features/Location/ui/LocationSearchForm';
import MomentPlaceColumn from '@/features/moment/ui/MomentPlaceColumn';
import MomentPlaceAddCard from '@/features/moment/ui/MomentPlaceAddCard';
import { InfiniteData, useQuery } from '@tanstack/react-query';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { useParams } from 'react-router-dom';
import { Tab } from '@/shared/ui/Tab';
import { momentFeatureQueries } from '@/features/moment/query/momentFeatureQueries';
import { Location } from '@/entities/Location/model/types';
import { MomentPlace } from '@/features/moment/model/types';
import { InfiniteScroll } from '@/shared/types/api';

function MomentPlacePage() {
  const { momentId } = useParams();
  const [keyword, setKeyword] = useState<string>('');
  const { data: momentDetail } = useQuery({ ...momentQueries.momentJSON({ momentId: Number(momentId) }) });
  const { data: momentPlaces } = useQuery({
    ...momentFeatureQueries.momentPlaces({ momentId: Number(momentId) }),
  });
  const [searchResult, setSearchResult] = useState<InfiniteData<InfiniteScroll<Location>>>();
  const [focus, setFocus] = useState<Location | MomentPlace | undefined>(momentPlaces?.places?.[0]);
  const firstSearchResult = searchResult?.pages[0].content[0];

  const handleSubmitKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleSearchPlace = (places: InfiniteData<InfiniteScroll<Location>>) => {
    setSearchResult(places);
  };

  const handleFocusPlace = (place: Location | MomentPlace) => {
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

  if (!momentPlaces) return;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail?.name}</h2>
      <main className={styles.contentContainer}>
        <section className={styles.locationSection}>
          <Tab handleTabChange={handleTabChange}>
            <Tab.TriggerList>
              <Tab.Trigger index={0}>방문 장소</Tab.Trigger>
              <Tab.Trigger index={1}>검색</Tab.Trigger>
            </Tab.TriggerList>
            <Tab.Panel index={0}>
              <MomentPlaceColumn handleClickPlace={handleFocusPlace} places={momentPlaces?.places || []} />
            </Tab.Panel>
            <Tab.Panel index={1}>
              <LocationSearchForm
                keyword={keyword}
                handleSubmitKeyword={handleSubmitKeyword}
                handleSearchPlace={handleSearchPlace}
              >
                {(location) => <MomentPlaceAddCard handleClickPlace={handleFocusPlace} data={location} />}
              </LocationSearchForm>
            </Tab.Panel>
          </Tab>
        </section>
        <section className={styles.mapWrapper}>
          <MomentPlaceMap searchPlaces={searchResult} momentPlaces={momentPlaces.places} focus={focus} />
        </section>
      </main>
    </div>
  );
}

export default MomentPlacePage;
