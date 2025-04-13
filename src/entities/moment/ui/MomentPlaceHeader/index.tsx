import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';
import Icon from '@/shared/ui/Icon';

function MomentPlaceHeader() {
  const navigate = useNavigate();
  const { crewId, momentId } = useParams();

  const handleClickMorePlaces = () => {
    navigate(routePaths.momentPlace.getPath(Number(crewId), Number(momentId)));
  };

  return (
    <button onClick={handleClickMorePlaces} className={styles.container}>
      <h2 className={styles.title}>방문 장소</h2>
      <Icon icon="arrow" iconSize="28" color="text-primary" />
    </button>
  );
}

export default MomentPlaceHeader;
