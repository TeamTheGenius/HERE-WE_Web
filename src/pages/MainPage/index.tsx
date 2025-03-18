import styles from './index.module.scss';
import ParticipatingCrewList from '@/widgets/crew/ParticipatingCrewList';
import ParticipatingCrewHeader from '@/widgets/crew/ParticipatingCrewHeader';
import UpcomingMomentList from '@/widgets/moment/UpcomingMomentList';
import UpcomingMomentHeader from '@/widgets/moment/UpcomingMomentHeader';
import ScrollableRow from '@/shared/ui/ScrollableRow';

function Main() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.container}>
        <UpcomingMomentHeader />
        <ScrollableRow>
          <UpcomingMomentList />
        </ScrollableRow>
      </aside>
      <main className={styles.container}>
        <ParticipatingCrewHeader />
        <ParticipatingCrewList />
      </main>
    </div>
  );
}

export default Main;
