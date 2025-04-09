import { MomentCommonPayload } from '@/entities/moment/model/types';
import { useMomentDetailWithFile } from '@/entities/moment/query/useMomentDetailWithFile';
import { usePatchMoment } from '@/entities/moment/query/usePatchMoment';
import { usePatchMomentFile } from '@/entities/moment/query/usePatchMomentFile';
import { MomentFormType } from '@/features/moment/model/types';
import MomentForm from '@/features/moment/ui/MomentForm';
import { makeSourceToFileList } from '@/shared/helper/sourceToFileList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MomentEditPage() {
  const { momentId } = useParams();
  const { mutateAsync: patchMoment } = usePatchMoment();
  const { mutateAsync: patchMomentFile } = usePatchMomentFile();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const [initialFileList, setInitialFileList] = useState<FileList | null>(null);

  useEffect(() => {
    const file = momentDetail?.file;
    if (!file) return;

    const fetchData = async () => {
      const fileList = await makeSourceToFileList(file.source, 'moment-image', file.fileEnv);
      if (fileList) setInitialFileList(fileList);
    };
    fetchData();
  }, [momentDetail?.file]);

  if (!momentDetail || !initialFileList) return null;

  const { name, capacity, meetAt, closedAt, place } = momentDetail;

  const initialData: MomentFormType = {
    name,
    capacity,
    meetAt,
    closedAt,
    place,
    image: initialFileList,
  };

  const handleJSONSubmit = async (data: MomentCommonPayload) => {
    await patchMoment({ momentId: Number(momentId), ...data });
    return { momentId: Number(momentId) };
  };

  return (
    <MomentForm
      initialData={initialData}
      handleJSONSubmit={handleJSONSubmit}
      handleFIleSUbmit={patchMomentFile}
      submitButtonText="수정하기"
    />
  );
}

export default MomentEditPage;
