import Header from '@/app/layouts/Header';
import styles from './index.module.scss';
import ParticipatingCrewList from '@/widgets/crew/ParticipatingCrewList';
import ParticipatingCrewHeader from '@/widgets/crew/ParticipatingCrewHeader';
import GridContainer from '@/shared/ui/GridContainer';
import UpcomingMomentList from '@/widgets/moment/UpcomingMomentList';
import UpcomingMomentHeader from '@/widgets/moment/UpcomingMomentHeader';
import ScrollableRow from '@/shared/ui/ScrollableRow';

function Main() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <aside className={styles.container}>
          <UpcomingMomentHeader />
          <ScrollableRow>
            <UpcomingMomentList />
          </ScrollableRow>
        </aside>
        <main className={styles.container}>
          <ParticipatingCrewHeader />
          <GridContainer>
            <ParticipatingCrewList />
          </GridContainer>
        </main>
      </div>
    </>
  );
}

export default Main;
