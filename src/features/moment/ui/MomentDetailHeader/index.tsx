import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useMomentDetailWithFile } from '@/entities/moment/query/useMomentDetailWithFile';
import { usePostMomentJoin } from '../../query/usePostMomentJoin';

function MomentDetailHeader() {
  const { momentId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const { mutateAsync: joinMoment } = usePostMomentJoin();

  if (!momentDetail) return null;

  const handleClickJoinButton = async () => {
    await joinMoment({ momentId: Number(momentId) });
  };

  {
    /** status에 따라 참여, 참여 취소, 마감 띄워주기 */
  }
  {
    /** status에 따라 버튼 클릭시 다른 api 호출 */
  }

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
