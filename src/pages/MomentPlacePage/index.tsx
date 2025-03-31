import Map from '@/features/map/ui/Map';
import styles from './index.module.scss';
import { useState } from 'react';
import LocationSearchForm from '@/features/Location/ui/LocationSearchForm';

type Tab = '방문 장소' | '검색';

function MomentPlacePage() {
  const [currentTab, setCurrentTab] = useState<Tab>('검색');
  const [keyword, setKeyword] = useState<string>('');

  const handleSubmitKeyword = (keyword: string) => {
    setKeyword(keyword);
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
                handleSelectLocation={() => {}}
              />
            )}
            {currentTab === '방문 장소' && <div>방문 장소</div>}
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
