import { CrewJSONMutationRequest } from '@/entities/crew/model/types';
import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';
import { usePostCrew } from '@/entities/crew/query/usePostCrew';
import { usePostCrewFile } from '@/entities/crew/query/usePostCrewFile';
import CrewForm from '@/features/crew/ui/CrewForm';
import { makeSourceToFileList } from '@/shared/helper/sourceToFileList';
import { FileMutationRequest } from '@/shared/types/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CrewEditPage() {
  const { crewId } = useParams();
  const [initialFileList, setInitialFileList] = useState<FileList>();
  const { mutateAsync: patchCrew } = usePostCrew();
  const { mutateAsync: patchCrewFile } = usePostCrewFile();

  const handleJSONSubmit = async (data: CrewJSONMutationRequest) => {
    const { crewId: returnedMomentId } = await patchCrew({ ...data });
    return { crewId: returnedMomentId };
  };

  const handleFileSubmit = async (data: FileMutationRequest) => {
    await patchCrewFile({ ...data });
  };
  const { data: crewDetail } = useCrewWithFile(Number(crewId));

  useEffect(() => {
    const file = crewDetail?.file;
    if (!file) return;

    const fetchData = async () => {
      const fileList = await makeSourceToFileList(file.source, 'crew-image', file.fileEnv);
      if (fileList) setInitialFileList(fileList);
    };
    fetchData();
  }, [crewDetail?.file]);

  if (!crewDetail || !initialFileList) return null;

  return (
    <CrewForm
      initialData={{ image: initialFileList, introduce: crewDetail?.introduce || '', title: crewDetail?.name || '' }}
      handleJSONSubmit={handleJSONSubmit}
      handleFIleSubmit={handleFileSubmit}
      submitType="수정"
    />
  );
}

export default CrewEditPage;
