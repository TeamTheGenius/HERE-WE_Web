import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useMomentDetailWithFile } from '../../query/useMomentDetailWithFile';
import { useParams } from 'react-router-dom';

function MomentDetailHeader() {
  const { momentId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));

  if (!momentDetail) return null;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail.name}</h2>
      <div className={styles.buttons}>
        <Button variant="secondary" icon="people-stroke" text="3명" />
        <Button>참여</Button>
      </div>
    </div>
  );
}

export default MomentDetailHeader;
