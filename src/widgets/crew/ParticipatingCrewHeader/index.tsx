import Button from '@/shared/ui/Button';
import styles from './index.module.scss';

function ParticipatingCrewHeader() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>참여중인 크루</h2>
      <Button>+ 크루 생성</Button>
    </div>
  );
}

export default ParticipatingCrewHeader;
