import { routePaths } from '@/app/routes/path';
import { usePatchCrew } from '@/entities/crew/query/usePatchCrew';
import { usePatchCrewFile } from '@/entities/crew/query/usePatchCrewFile';
import CrewEditContent from '@/entities/crew/ui/CrewEditContent';
import { CrewFormType } from '@/features/crew/model/types';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import DetailListSkeleton from '@/shared/ui/DetailListSkeleton';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CrewEditPage() {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: patchCrew } = usePatchCrew();
  const { mutateAsync: patchCrewFile } = usePatchCrewFile();

  const handleSubmit = async (data: CrewFormType) => {
    const { title, introduce, image } = data;
    const files = image ? [...image] : [];

    await Promise.all([
      patchCrew({ name: title, introduce: introduce, crewId: Number(crewId) }),
      patchCrewFile({ id: Number(crewId), files: files }),
    ]);

    navigate(routePaths.home.getPath(Number(crewId)));
  };

  const crewRegister = useCrewRegister({
    image: undefined,
    introduce: '',
    title: '',
  });

  return (
    <TitledFormLayout>
      <TitledFormLayout.Title>크루 수정 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form handleSubmit={crewRegister.formMethods.handleSubmit(handleSubmit)}>
        <Suspense fallback={<DetailListSkeleton itemCount={6} titleWidth="12rem" contentHeight="6rem" />}>
          <CrewEditContent crewId={Number(crewId)} crewRegister={crewRegister} />
        </Suspense>
        <TitledFormLayout.Button>수정하기</TitledFormLayout.Button>
      </TitledFormLayout.Form>
    </TitledFormLayout>
  );
}

export default CrewEditPage;
