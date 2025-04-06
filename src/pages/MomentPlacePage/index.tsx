import Map from '@/features/map/ui/Map';
import styles from './index.module.scss';
import { useState } from 'react';
import LocationSearchForm from '@/features/Location/ui/LocationSearchForm';
import MomentPlaceColumn from '@/features/moment/ui/MomentPlaceColumn';
import { usePostMomentPlace } from '@/features/moment/query/usePostMomentPlace';
import { Location } from '@/entities/Location/model/types';
import { useParams } from 'react-router-dom';

type Tab = '방문 장소' | '검색';

function MomentPlacePage() {
  const { momentId } = useParams();

  const [currentTab, setCurrentTab] = useState<Tab>('검색');
  const [keyword, setKeyword] = useState<string>('');

  const { mutateAsync: addPlace } = usePostMomentPlace();

  const handleSubmitKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handlePlaceAdd = async (place: Location) => {
    await addPlace({ place, momentId: Number(momentId) });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>피자 먹으러 가자</h2>
      <main className={styles.contentContainer}>
        <div className={styles.locationSection}>
          <ul className={styles.tabs}>
            <li onClick={() => setCurrentTab('검색')} className={styles.tabItem}>
              <button>검색</button>
            </li>
            <li className={styles.tabItem}>
              <button onClick={() => setCurrentTab('방문 장소')}>방문 장소</button>
            </li>
          </ul>
          <div className={styles.tabContent}>
            {currentTab === '검색' && (
              <LocationSearchForm
                keyword={keyword}
                handleSubmitKeyword={handleSubmitKeyword}
                handleAddLocation={handlePlaceAdd}
                handleClickLocation={() => {}}
              />
            )}
            {currentTab === '방문 장소' && (
              <MomentPlaceColumn handleClickLocation={() => {}} handleDeleteLocation={() => {}} />
            )}
          </div>
        </div>
        <div className={styles.mapWrapper}>
          <Map />
        </div>
      </main>
    </div>
  );
}

export default MomentPlacePage;
