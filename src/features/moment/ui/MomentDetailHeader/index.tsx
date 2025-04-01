import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useMomentDetailWithFile } from '../../../../entities/moment/query/useMomentDetailWithFile';
import { useParams } from 'react-router-dom';
import { usePostmomentJoin } from '@/features/moment/query/usePostmomentJoin';

function MomentDetailHeader() {
  const { momentId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const { mutateAsync: joinMoment } = usePostmomentJoin();

  if (!momentDetail) return null;

  const handleClickJoinButton = async () => {
    await joinMoment({ momentId: Number(momentId) });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail.name}</h2>
      <div className={styles.buttons}>
        <Button variant="secondary" icon="people-stroke" text="3명" />
        <Button onClick={handleClickJoinButton}>참여</Button>
      </div>
    </div>
  );
}

export default MomentDetailHeader;
