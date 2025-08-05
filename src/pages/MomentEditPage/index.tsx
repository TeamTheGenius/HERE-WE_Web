import { routePaths } from '@/app/routes/path';
import { usePatchMoment } from '@/entities/moment/query/usePatchMoment';
import { usePatchMomentFile } from '@/entities/moment/query/usePatchMomentFile';
import MomentEditContent from '@/entities/moment/ui/MomentEditContent';
import { useMomentRegister } from '@/features/moment/hook/useMomentRegister';
import { MomentFormType } from '@/features/moment/model/types';
import { formatLocalDateTime } from '@/shared/lib/dateFormater';
import DetailListSkeleton from '@/shared/ui/DetailListSkeleton';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MomentEditPage() {
  const { momentId, crewId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: patchMoment } = usePatchMoment();
  const { mutateAsync: patchMomentFile } = usePatchMomentFile();

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
      await Promise.all([
        patchMoment({
          momentId: Number(momentId),
          momentName: name,
          place: place,
          closedAt: formattedClosedAt,
          meetAt: formattedMeetAt,
          capacity: capacity,
        }),
        patchMomentFile({ id: Number(momentId), files: files }),
      ]);
      navigate(routePaths.momentDetail.getPath(Number(crewId), Number(momentId)));
    } catch (error) {
      register.handleApiError(error);
    }
  };

  return (
    <TitledFormLayout>
      <TitledFormLayout.Title>모먼트 수정 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form handleSubmit={register.formMethods.handleSubmit(handleSubmit)}>
        <Suspense fallback={<DetailListSkeleton itemCount={6} titleWidth="12rem" contentHeight="6rem" />}>
          <MomentEditContent momentRegister={register} momentId={Number(momentId)} crewId={Number(crewId)} />
        </Suspense>
        <TitledFormLayout.Button>수정하기</TitledFormLayout.Button>
      </TitledFormLayout.Form>
    </TitledFormLayout>
  );
}

export default MomentEditPage;
