import { MomentJSONMutationRequest } from '@/entities/moment/model/types';
import { usePostMoment } from '@/entities/moment/query/usePostMoment';
import { usePostMomentFile } from '@/entities/moment/query/usePostMomentFile';
import { MomentFormType } from '@/features/moment/model/types';
import MomentForm from '@/features/moment/ui/MomentForm';
import { useParams } from 'react-router-dom';

function MomentCreatePage() {
  const { crewId } = useParams();
  const { mutateAsync: postMoment } = usePostMoment();
  const { mutateAsync: postMomentFile } = usePostMomentFile();

  const initialData: MomentFormType = {
    name: '',
    image: undefined,
    capacity: undefined,
    meetAt: '',
    closedAt: '',
    place: undefined,
  };

  const handleJSONSubmit = async (data: MomentJSONMutationRequest) => {
    const { momentId: returnedMomentId } = await postMoment({ crewId: Number(crewId), ...data });
    return { momentId: returnedMomentId };
  };

  return (
    <MomentForm
      initialData={initialData}
      handleJSONSubmit={handleJSONSubmit}
      handleFIleSUbmit={postMomentFile}
      submitType="생성"
    />
  );
}

export default MomentCreatePage;
