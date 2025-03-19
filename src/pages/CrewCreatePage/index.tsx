import { usePostCrew } from '@/entities/crew/query/usePostCrew';
import { usePostCrewFile } from '@/entities/crew/query/usePostCrewFile';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import CrewForm from '@/features/crew/ui/CrewForm';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { FormEvent } from 'react';

function CrewCreatePage() {
  const { formMethods, handleFileInputClick, mergedRef } = useCrewRegister({
    image: undefined,
    title: '',
    introduce: '',
  });
  const { mutateAsync: postCrew } = usePostCrew();
  const { mutateAsync: postCrewFile } = usePostCrewFile();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await formMethods.trigger();
    if (!isValid) return;

    const crewName = formMethods.getValues('title');
    const crewIntroduce = formMethods.getValues('introduce');
    const fileList = formMethods.getValues('image');
    const files = fileList ? [...fileList] : [];

    const { crewId } = await postCrew({ name: crewName, introduce: crewIntroduce });
    if (files.length > 0) await postCrewFile({ crewId, files });
  };

  return (
    <TitledFormLayout handleSubmit={handleSubmit}>
      <TitledFormLayout.Title>크루 생성 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form>
        <CrewForm formMethods={formMethods} handleFileInputClick={handleFileInputClick} mergedRef={mergedRef} />
      </TitledFormLayout.Form>
      <TitledFormLayout.Button>생성하기</TitledFormLayout.Button>
    </TitledFormLayout>
  );
}

export default CrewCreatePage;
