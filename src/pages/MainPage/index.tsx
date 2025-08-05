import ParticipatingCrewHeader from '@/features/crew/ui/ParticipatingCrewHeader';
import styles from './index.module.scss';
import UpcomingMomentHeader from '@/features/moment/ui/UpcomingMomentHeader';
import UpcomingMomentsRow from '@/features/moment/ui/UpcomingMomentsRow';
import ParticipatingCrewList from '@/features/crew/ui/ParticipatingCrewList';
import { Suspense } from 'react';
import CardListSkeleton from '@/shared/ui/CardListSkeleton';

function Main() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.container}>
        <UpcomingMomentHeader />
        <Suspense fallback={<CardListSkeleton direction="horizontal" />}>
          <UpcomingMomentsRow />
        </Suspense>
      </aside>
      <main className={styles.listContainer}>
        <ParticipatingCrewHeader />
        <Suspense fallback={<CardListSkeleton direction="grid" />}>
          <ParticipatingCrewList />
        </Suspense>
      </main>
    </div>
  );
}

export default Main;
