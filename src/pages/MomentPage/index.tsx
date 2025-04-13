import BaseCrewHeader from '@/widgets/crew/BaseCrewHeader';
import CrewMomentList from '@/widgets/moment/CrewMomentList';
import MomentCreateButton from '@/widgets/moment/MomentCreateButton';

function MomentPage() {
  return (
    <>
      <BaseCrewHeader />
      <MomentCreateButton />
      <CrewMomentList />
    </>
  );
}

export default MomentPage;
