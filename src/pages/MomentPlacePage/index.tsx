import Map from '@/features/map/ui/Map';
import styles from './index.module.scss';
import { useState } from 'react';
import LocationSearchForm from '@/features/Location/ui/LocationSearchForm';
import MomentPlaceColumn from '@/features/moment/ui/MomentPlaceColumn';
import MomentPlaceAddCard from '@/features/moment/ui/MomentPlaceAddCard';
import { useQuery } from '@tanstack/react-query';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { useParams } from 'react-router-dom';
import { Tab } from '@/shared/ui/Tab';

function MomentPlacePage() {
  const { momentId } = useParams();
  const [keyword, setKeyword] = useState<string>('');
  const { data: momentDetail } = useQuery({ ...momentQueries.momentJSON({ momentId: Number(momentId) }) });

  const handleSubmitKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail?.name}</h2>
      <main className={styles.contentContainer}>
        <section className={styles.locationSection}>
          <Tab>
            <Tab.TriggerList>
              <Tab.Trigger index={0}>방문 장소</Tab.Trigger>
              <Tab.Trigger index={1}>검색</Tab.Trigger>
            </Tab.TriggerList>
            <Tab.Panel index={0}>
              <MomentPlaceColumn handleClickPlace={() => {}} />
            </Tab.Panel>
            <Tab.Panel index={1}>
              <LocationSearchForm keyword={keyword} handleSubmitKeyword={handleSubmitKeyword}>
                {(location) => <MomentPlaceAddCard handleClickPlace={() => {}} data={location} />}
              </LocationSearchForm>
            </Tab.Panel>
          </Tab>
        </section>
        <section className={styles.mapWrapper}>
          <Map />
        </section>
      </main>
    </div>
  );
}

export default MomentPlacePage;
