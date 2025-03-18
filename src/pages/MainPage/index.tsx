import styles from './index.module.scss';
import ParticipatingCrewList from '@/widgets/crew/ParticipatingCrewList';
import ParticipatingCrewHeader from '@/widgets/crew/ParticipatingCrewHeader';
import GridContainer from '@/shared/ui/GridContainer';
import UpcomingMomentList from '@/widgets/moment/UpcomingMomentList';
import UpcomingMomentHeader from '@/widgets/moment/UpcomingMomentHeader';
import ScrollableRow from '@/shared/ui/ScrollableRow';
import { Pagination } from '@/shared/ui/Pagination';

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
        <GridContainer>
          <ParticipatingCrewList />
        </GridContainer>
      </main>
      <Pagination>
        <Pagination.Button>{'<'}</Pagination.Button>
        <Pagination.Button isActive={true}>1</Pagination.Button>
        <Pagination.Button>2</Pagination.Button>
        <Pagination.Button>3</Pagination.Button>
        <Pagination.Button>4</Pagination.Button>
        <Pagination.Button>5</Pagination.Button>
        <Pagination.Button>...</Pagination.Button>
        <Pagination.Button>{'>'}</Pagination.Button>
      </Pagination>
    </div>
  );
}

export default Main;
