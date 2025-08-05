import { routePaths } from '@/app/routes/path';
import { usePostCrew } from '@/entities/crew/query/usePostCrew';
import { usePostCrewFile } from '@/entities/crew/query/usePostCrewFile';
import CrewFormField from '@/entities/crew/ui/CrewFormField';
import { CrewFormType } from '@/features/crew/model/types';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { useNavigate } from 'react-router-dom';

function CrewCreatePage() {
  const navigate = useNavigate();
  const { mutateAsync: postCrew } = usePostCrew();
  const { mutateAsync: postCrewFile } = usePostCrewFile();

  const handleSubmit = async (data: CrewFormType) => {
    const { title, introduce, image } = data;
    const files = image ? [...image] : [];

    const { crewId } = await postCrew({ name: title, introduce: introduce });
    await postCrewFile({ id: crewId, files: files });

    navigate(routePaths.home.getPath(crewId));
  };

  const crewRegister = useCrewRegister({
    image: undefined,
    introduce: '',
    title: '',
  });

  return (
    <TitledFormLayout>
      <TitledFormLayout.Title>크루 생성 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form handleSubmit={crewRegister.formMethods.handleSubmit(handleSubmit)}>
        <CrewFormField crewRegister={crewRegister} />
        <TitledFormLayout.Button>생성하기</TitledFormLayout.Button>
      </TitledFormLayout.Form>
    </TitledFormLayout>
  );
}

export default CrewCreatePage;
