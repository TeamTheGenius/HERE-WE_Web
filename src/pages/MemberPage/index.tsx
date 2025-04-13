import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import MemberListSection from '@/widgets/member/MemberListSection';
import CrewInviteButton from '@/widgets/member/CrewInviteButton';
import styles from './index.module.scss';

function CrewMembersPage() {
  return (
    <div className={styles.wapper}>
      <BaseCrewHeader />
      <div>
        <CrewInviteButton />
      </div>
      <MemberListSection />
    </div>
  );
}

export default CrewMembersPage;
