import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import MemberListSection from '@/widgets/member/MemberListSection';
import CrewInviteButton from '@/widgets/member/CrewInviteButton';

function CrewMembersPage() {
  return (
    <>
      <BaseCrewHeader />
      <CrewInviteButton />
      <MemberListSection />
    </>
  );
}

export default CrewMembersPage;
