import Button from '@/shared/ui/Button';
import styles from './index.module.scss';

function MomentDetailHeader() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>피자 탐방하기</h2>
      <div className={styles.buttons}>
        <Button variant="secondary" icon="people-stroke" text="3명" />
        <Button>참여</Button>
      </div>
    </div>
  );
}

export default MomentDetailHeader;
