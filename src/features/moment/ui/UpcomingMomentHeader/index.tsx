import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';
import Icon from '@/shared/ui/Icon';

function UpcomingMomentHeader() {
  const navigate = useNavigate();

  const handleClickMoreButton = () => {
    navigate(routePaths.upcomingMoment);
  };

  return (
    <button className={styles.container} onClick={handleClickMoreButton}>
      <h2 className={styles.title}>다가오는 모먼트</h2>
      <Icon icon="arrow" iconSize="28" color="text-primary" />
    </button>
  );
}

export default UpcomingMomentHeader;
