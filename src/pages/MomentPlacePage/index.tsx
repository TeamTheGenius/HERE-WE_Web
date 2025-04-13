import Map from '@/features/map/ui/Map';
import styles from './index.module.scss';
import { useState } from 'react';
import LocationSearchForm from '@/features/Location/ui/LocationSearchForm';
import MomentPlaceColumn from '@/features/moment/ui/MomentPlaceColumn';
import MomentPlaceAddCard from '@/features/moment/ui/MomentPlaceAddCard';
import { useQuery } from '@tanstack/react-query';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { useParams } from 'react-router-dom';

type Tab = '방문 장소' | '검색';

function MomentPlacePage() {
  const { momentId } = useParams();
  const [currentTab, setCurrentTab] = useState<Tab>('방문 장소');
  const [keyword, setKeyword] = useState<string>('');
  const { data: momentDetail } = useQuery({ ...momentQueries.momentJSON({ momentId: Number(momentId) }) });

  const handleSubmitKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail?.name}</h2>
      <main className={styles.contentContainer}>
        <div className={styles.locationSection}>
          <ul className={styles.tabs}>
            <li className={styles.tabItem}>
              <button onClick={() => setCurrentTab('방문 장소')}>방문 장소</button>
            </li>
            <li onClick={() => setCurrentTab('검색')} className={styles.tabItem}>
              <button>검색</button>
            </li>
          </ul>
          <div className={styles.tabContent}>
            {currentTab === '검색' && (
              <LocationSearchForm keyword={keyword} handleSubmitKeyword={handleSubmitKeyword}>
                {(location) => <MomentPlaceAddCard handleClickPlace={() => {}} data={location} />}
              </LocationSearchForm>
            )}
            {currentTab === '방문 장소' && <MomentPlaceColumn handleClickPlace={() => {}} />}
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
