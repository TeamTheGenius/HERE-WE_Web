import Button from '@/shared/ui/Button';
import styles from './index.module.scss';

function UpcomingMomentHeader() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>다가오는 모먼트</h2>
      <Button variant="secondary">더보기</Button>
    </div>
  );
}

export default UpcomingMomentHeader;
