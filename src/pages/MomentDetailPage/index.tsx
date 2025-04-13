import MomentDetailHeader from '@/features/moment/ui/MomentDetailHeader';
import MomentInformation from '@/entities/moment/ui/MomentInformation';
import MomentPlaceHeader from '@/entities/moment/ui/MomentPlaceHeader';
import MomentPlaceRow from '@/features/moment/ui/MomentPlaceRow';
import styles from './index.module.scss';

function MomentDetailPage() {
  return (
    <main className={styles.container}>
      <section>
        <MomentDetailHeader />
        <MomentInformation />
      </section>
      <section>
        <MomentPlaceHeader />
        <MomentPlaceRow />
      </section>
    </main>
  );
}

export default MomentDetailPage;
