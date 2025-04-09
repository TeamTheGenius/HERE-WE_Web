import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function MomentInformationHeader() {
  const { crewId, momentId } = useParams();
  const navigate = useNavigate();

  const handleClickEditButton = () => {
    navigate(routePaths.momentEdit.getPath(Number(crewId), Number(momentId)));
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>모먼트 정보</h2>
      <Button onClick={handleClickEditButton} variant="secondary">
        수정
      </Button>
    </div>
  );
}

export default MomentInformationHeader;
