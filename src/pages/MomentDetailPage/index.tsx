import MomentDetailHeader from '@/entities/moment/ui/MomentDetailHeader';
import MomentInformation from '@/entities/moment/ui/MomentInformation';
import MomentInformationHeader from '@/entities/moment/ui/MomentInformationHeader';

function MomentDetailPage() {
  return (
    <>
      <MomentDetailHeader />
      <MomentInformationHeader />
      <MomentInformation />
    </>
  );
}

export default MomentDetailPage;
