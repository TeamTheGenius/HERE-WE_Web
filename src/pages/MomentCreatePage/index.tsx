import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';
import { useMomentRegister } from '@/features/moment/hook/useMomentRegister';
import MomentForm from '@/features/moment/ui/MomentForm';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { useParams } from 'react-router-dom';

function MomentCreatePage() {
  const { crewId } = useParams();
  const { data: crewData } = useCrewWithFile(Number(crewId));
  const { formMethods, handleFileInputClick, mergedRef } = useMomentRegister({
    title: '',
    image: undefined,
    participantCountLimit: undefined,
    deadlineDateTime: '',
    applicationDeadline: '',
    meetingLocation: undefined,
  });

  const onSubmit = () => {
    alert('test');
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
