import Button from '@/shared/ui/Button';
import styles from './index.module.scss';

function MomentInformationHeader() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>모먼트 정보</h2>
      <Button variant="secondary">수정</Button>
    </div>
  );
}

export default MomentInformationHeader;
