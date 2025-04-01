import Button from '@/shared/ui/Button';
import styles from './index.module.scss';

function MomentPlaceHeader() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>방문 장소</h2>
      <Button variant="secondary">더보기</Button>
    </div>
  );
}

export default MomentPlaceHeader;
