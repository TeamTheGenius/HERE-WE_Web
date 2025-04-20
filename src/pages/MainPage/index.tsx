import styles from './index.module.scss';
import ParticipatingCrewList from '@/widgets/crew/ParticipatingCrewList';
import ParticipatingCrewHeader from '@/widgets/crew/ParticipatingCrewHeader';
import UpcomingMomentHeader from '@/widgets/moment/UpcomingMomentHeader';
import UpcomingMomentsRow from '@/widgets/moment/UpcomingMomentsRow';
import { useAddToast } from '@/shared/hooks/useToast';
import { useEffect } from 'react';

function Main() {
  const test = useAddToast();
  useEffect(() => {
    test({
      duration: Infinity,
      type: 'action',
      message: "'팀더지니어스' 크루를 생성했습니다",
      actionLabel: '보러가기',
      onAction: () => {
        console.log('팀더지니어스');
      },
    });
  }, []);
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
