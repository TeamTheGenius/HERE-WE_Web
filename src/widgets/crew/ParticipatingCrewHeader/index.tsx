import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function ParticipatingCrewHeader() {
  const navigate = useNavigate();

  const handleClickCreateCrew = () => {
    navigate(routePaths.createCrew);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>참여중인 크루</h2>
      <Button onClick={handleClickCreateCrew}>+ 크루 생성</Button>
    </div>
  );
}

export default ParticipatingCrewHeader;
