import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function MomentPlaceHeader() {
  const navigate = useNavigate();
  const { crewId, momentId } = useParams();

  const handleClickMorePlaces = () => {
    navigate(routePaths.momentPlace.getPath(Number(crewId), Number(momentId)));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>방문 장소</h2>
      <Button onClick={handleClickMorePlaces} variant="secondary">
        더보기
      </Button>
    </div>
  );
}

export default MomentPlaceHeader;
