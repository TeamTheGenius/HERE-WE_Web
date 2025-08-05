import { routePaths } from '@/app/routes/path';
import { usePostMoment } from '@/entities/moment/query/usePostMoment';
import { usePostMomentFile } from '@/entities/moment/query/usePostMomentFile';
import MomentCreateContent from '@/entities/moment/ui/MomentCreateContent';
import { useMomentRegister } from '@/features/moment/hook/useMomentRegister';
import { MomentFormType } from '@/features/moment/model/types';
import { formatLocalDateTime } from '@/shared/lib/dateFormater';
import DetailListSkeleton from '@/shared/ui/DetailListSkeleton';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MomentCreatePage() {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: postMoment } = usePostMoment();
  const { mutateAsync: postMomentFile } = usePostMomentFile();

  const register = useMomentRegister({
    name: '',
    capacity: undefined,
    meetAt: '',
    closedAt: '',
    place: undefined,
    image: undefined,
  });

  const handleSubmit = async (data: MomentFormType) => {
    const { name, image, capacity, closedAt, meetAt, place } = data;
    if (!crewId || !capacity || !place) return;
    const files = image ? [...image] : [];

    const closedAtDate = new Date(closedAt);
    const meetAtDate = new Date(meetAt);
    const formattedClosedAt = formatLocalDateTime(closedAtDate);
    const formattedMeetAt = formatLocalDateTime(meetAtDate);

    try {
      const { momentId } = await postMoment({
        crewId: Number(crewId),
        momentName: name,
        place: place,
        closedAt: formattedClosedAt,
        meetAt: formattedMeetAt,
        capacity: Number(capacity),
      });
      await postMomentFile({ id: Number(momentId), files: files });
      navigate(routePaths.momentDetail.getPath(Number(crewId), Number(momentId)));
    } catch (error) {
      register.handleApiError(error);
    }
  };

  return (
    <TitledFormLayout>
      <TitledFormLayout.Title>모먼트 생성 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form handleSubmit={register.formMethods.handleSubmit(handleSubmit)}>
        <Suspense fallback={<DetailListSkeleton itemCount={6} titleWidth="12rem" contentHeight="6rem" />}>
          <MomentCreateContent momentRegister={register} crewId={Number(crewId)} />
        </Suspense>
        <TitledFormLayout.Button>생성하기</TitledFormLayout.Button>
      </TitledFormLayout.Form>
    </TitledFormLayout>
  );
}

export default MomentCreatePage;
