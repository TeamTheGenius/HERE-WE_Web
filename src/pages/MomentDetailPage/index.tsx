import MomentDetailHeader from '@/features/moment/ui/MomentDetailHeader';
import MomentInformation from '@/entities/moment/ui/MomentInformation';
import MomentPlaceHeader from '@/entities/moment/ui/MomentPlaceHeader';
import MomentPlaceRow from '@/features/moment/ui/MomentPlaceRow';
import styles from './index.module.scss';
import MomentInformationSkeleton from '@/entities/moment/ui/MomentInformationSkeleton';
import CardListSkeleton from '@/shared/ui/CardListSkeleton';
import { Suspense } from 'react';

function MomentDetailPage() {
  return (
    <main className={styles.container}>
      <section>
        <MomentDetailHeader />
        <Suspense fallback={<MomentInformationSkeleton />}>
          <MomentInformation />
        </Suspense>
      </section>
      <section>
        <MomentPlaceHeader />
        <Suspense fallback={<CardListSkeleton direction="horizontal" />}>
          <MomentPlaceRow />
        </Suspense>
      </section>
    </main>
  );
}

export default MomentDetailPage;
