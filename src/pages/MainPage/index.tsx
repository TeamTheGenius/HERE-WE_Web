import Header from '@/app/layouts/Header';
import styles from './index.module.scss';
import ParticipatingCrewList from '@/widgets/crew/ParticipatingCrewList';
import ParticipatingCrewHeader from '@/widgets/crew/ParticipatingCrewHeader';
import GridContainer from '@/shared/ui/GridContainer';

function Main() {
  return (
    <>
      <Header />
      <main className={styles.mainWrapper}>
        <ParticipatingCrewHeader />
        <GridContainer>
          <ParticipatingCrewList />
        </GridContainer>
      </main>
    </>
  );
}

export default Main;
