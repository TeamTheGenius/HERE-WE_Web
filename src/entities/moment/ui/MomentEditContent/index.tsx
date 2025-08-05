import { makeSourceToFileList } from '@/shared/helper/sourceToFileList';
import { useEffect } from 'react';
import { useMomentRegister } from '@/features/moment/hook/useMomentRegister';
import { useMomentDetailWithFile } from '../../query/useMomentDetailWithFile';
import { MomentFormType } from '@/features/moment/model/types';
import MomentFormField from '../MomentFormField';
import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';

interface MomentEditContentProps {
  momentId: number;
  crewId: number;
  momentRegister: ReturnType<typeof useMomentRegister>;
}

function MomentEditContent({ momentId, momentRegister, crewId }: MomentEditContentProps) {
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const { data: crewData } = useCrewWithFile(crewId);

  useEffect(() => {
    const file = momentDetail?.file;
    if (!file) return;

    const prepareData = async () => {
      const fileList = await makeSourceToFileList(file.source, 'moment-image', file.fileEnv);

      const data: MomentFormType = {
        image: fileList || undefined,
        capacity: momentDetail.capacity,
        name: momentDetail.name,
        meetAt: momentDetail.meetAt,
        closedAt: momentDetail.closedAt,
        place: momentDetail.place,
      };

      momentRegister.formMethods.reset(data);
    };

    prepareData();
  }, [momentDetail?.file]);

  if (!momentDetail || !crewData) return;

  return <MomentFormField momentRegister={momentRegister} crewName={crewData.name} />;
}

export default MomentEditContent;
