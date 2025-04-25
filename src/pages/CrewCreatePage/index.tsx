import { CrewJSONMutationRequest } from '@/entities/crew/model/types';
import { usePostCrew } from '@/entities/crew/query/usePostCrew';
import { usePostCrewFile } from '@/entities/crew/query/usePostCrewFile';
import CrewForm from '@/features/crew/ui/CrewForm';
import { FileMutationRequest } from '@/shared/types/api';

function CrewCreatePage() {
  const { mutateAsync: postCrew } = usePostCrew();
  const { mutateAsync: postCrewFile } = usePostCrewFile();

  const handleJSONSubmit = async (data: CrewJSONMutationRequest) => {
    const { crewId: returnedMomentId } = await postCrew({ ...data });
    return { crewId: returnedMomentId };
  };

  const handleFileSubmit = async (data: FileMutationRequest) => {
    await postCrewFile({ ...data });
  };

  return (
    <CrewForm
      initialData={{ image: undefined, introduce: '', title: '' }}
      handleJSONSubmit={handleJSONSubmit}
      handleFIleSubmit={handleFileSubmit}
      submitType="생성"
    />
  );
}

export default CrewCreatePage;
