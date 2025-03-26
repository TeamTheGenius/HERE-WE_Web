import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function MomentCreateButton() {
  const navigate = useNavigate();
  const { crewId } = useParams();

  const handleClickCreateMoment = () => {
    navigate(routePaths.momentCreate.getPath(Number(crewId)));
  };

  return (
    <>
      <Button className={styles.momentCreateButton} onClick={handleClickCreateMoment}>
        + 모먼트 생성
      </Button>
    </>
  );
}

export default MomentCreateButton;
