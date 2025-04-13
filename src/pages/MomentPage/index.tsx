import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import CrewMomentList from '@/widgets/moment/CrewMomentList';
import MomentCreateButton from '@/widgets/moment/MomentCreateButton';
import styles from './index.module.scss';

function MomentPage() {
  return (
    <div className={styles.wapper}>
      <BaseCrewHeader />
      <div>
        <MomentCreateButton />
      </div>
      <CrewMomentList />
    </div>
  );
}

export default MomentPage;
