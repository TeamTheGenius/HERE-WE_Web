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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formMethods.trigger();
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
