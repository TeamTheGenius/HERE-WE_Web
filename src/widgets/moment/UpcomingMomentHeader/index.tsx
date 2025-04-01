import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function UpcomingMomentHeader() {
  const navigate = useNavigate();

  const handleClickMoreButton = () => {
    navigate(routePaths.upcomingMoment);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>다가오는 모먼트</h2>
      <Button onClick={handleClickMoreButton} variant="secondary">
        더보기
      </Button>
    </div>
  );
}

export default UpcomingMomentHeader;
