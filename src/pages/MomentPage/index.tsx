import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import CrewMomentList from '@/widgets/moment/CrewMomentList';
import MomentCreateButton from '@/widgets/moment/MomentCreateButton';
import styles from './index.module.scss';
import { Suspense } from 'react';
import CardListSkeleton from '@/shared/ui/CardListSkeleton';
import Skeleton from '@/shared/ui/Skeleton';

function MomentPage() {
  return (
    <div className={styles.wapper}>
      <Suspense fallback={<Skeleton width="10rem" height="2rem" variant="rect" />}>
        <BaseCrewHeader />
      </Suspense>
      <div>
        <MomentCreateButton />
      </div>
      <Suspense fallback={<CardListSkeleton direction="grid" count={12} />}>
        <CrewMomentList />
      </Suspense>
    </div>
  );
}

export default MomentPage;
