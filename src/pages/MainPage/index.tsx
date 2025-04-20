import styles from './index.module.scss';
import ParticipatingCrewList from '@/widgets/crew/ParticipatingCrewList';
import ParticipatingCrewHeader from '@/widgets/crew/ParticipatingCrewHeader';
import UpcomingMomentHeader from '@/widgets/moment/UpcomingMomentHeader';
import UpcomingMomentsRow from '@/widgets/moment/UpcomingMomentsRow';

function Main() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.container}>
        <UpcomingMomentHeader />
        <UpcomingMomentsRow />
      </aside>
      <main className={styles.listContainer}>
        <ParticipatingCrewHeader />
        <ParticipatingCrewList />
      </main>
    </div>
  );
}

export default Main;
