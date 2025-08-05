import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';
import { makeSourceToFileList } from '@/shared/helper/sourceToFileList';
import { useEffect } from 'react';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import CrewFormField from '@/entities/crew/ui/CrewFormField';

interface CrewEditContentProps {
  crewId: number;
  crewRegister: ReturnType<typeof useCrewRegister>;
}

function CrewEditContent({ crewId, crewRegister }: CrewEditContentProps) {
  const { data: crewDetail } = useCrewWithFile(crewId);

  useEffect(() => {
    const file = crewDetail?.file;
    if (!file) return;

    const prepareData = async () => {
      const fileList = await makeSourceToFileList(file.source, 'crew-image', file.fileEnv);

      const data = {
        image: fileList || undefined,
        introduce: crewDetail.introduce || '',
        title: crewDetail.name || '',
      };

      crewRegister.formMethods.reset(data);
    };

    prepareData();
  }, [crewDetail?.file]);

  return <CrewFormField crewRegister={crewRegister} />;
}

export default CrewEditContent;
