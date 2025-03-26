import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import styles from './index.module.scss';
import CrewMomentList from '@/widgets/moment/CrewMomentList';
import MomentCreateButton from '@/widgets/moment/MomentCreateButton';

function MomentPage() {
  return (
    <main className={styles.wrapper}>
      <BaseCrewHeader />
      <MomentCreateButton />
      <CrewMomentList />
    </main>
  );
}

export default MomentPage;
