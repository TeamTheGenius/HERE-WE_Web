import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import styles from './index.module.scss';
import MemberListSection from '@/widgets/member/MemberListSection';
import CrewInviteButton from '@/widgets/member/CrewInviteButton';

function CrewMembersPage() {
  return (
    <main className={styles.wrapper}>
      <BaseCrewHeader />
      <CrewInviteButton />
      <MemberListSection />
    </main>
  );
}

export default CrewMembersPage;
