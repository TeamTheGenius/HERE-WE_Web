import { routePaths } from '@/app/routes/path';
import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';
import { usePostMoment } from '@/entities/moment/query/usePostMoment';
import { usePostMomentFile } from '@/entities/moment/query/usePostMomentFile';
import { useMomentRegister } from '@/features/moment/hook/useMomentRegister';
import MomentForm from '@/features/moment/ui/MomentForm';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { useNavigate, useParams } from 'react-router-dom';

function MomentCreatePage() {
  const { crewId } = useParams();
  const navigate = useNavigate();
  const { data: crewData } = useCrewWithFile(Number(crewId));
  const { mutateAsync: postMoment } = usePostMoment();
  const { mutateAsync: postMomentFile } = usePostMomentFile();
  const { formMethods, handleFileInputClick, mergedRef } = useMomentRegister({
    name: '',
    image: undefined,
    capacity: undefined,
    meetAt: '',
    closedAt: '',
    place: undefined,
  });

  const { getValues } = formMethods;

  const onSubmit = async () => {
    const { name, image, capacity, closedAt, meetAt, place } = getValues();
    if (!crewId || !capacity || !place) return;
    const formattedClosedAt = new Date(closedAt).toISOString();
    const formattedMeetAt = new Date(meetAt).toISOString();

    const files = image ? [...image] : [];

    try {
      const { momentId } = await postMoment({
        crewId: Number(crewId),
        momentName: name,
        capacity,
        closedAt: formattedClosedAt,
        meetAt: formattedMeetAt,
        place,
      });

      await postMomentFile({ momentId, files: files });
      navigate(routePaths.momentDetail.getPath(Number(crewId), momentId));
    } catch (error) {
      // 모먼트 삭제
    }
  };

  if (!crewData) return null;

  return (
    <TitledFormLayout handleSubmit={formMethods.handleSubmit(onSubmit)}>
      <TitledFormLayout.Title>모먼트 생성 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form>
        <MomentForm
          crewData={crewData}
          formMethods={formMethods}
          handleFileInputClick={handleFileInputClick}
          mergedRef={mergedRef}
        />
      </TitledFormLayout.Form>
      <TitledFormLayout.Button>생성하기</TitledFormLayout.Button>
    </TitledFormLayout>
  );
}

export default MomentCreatePage;
