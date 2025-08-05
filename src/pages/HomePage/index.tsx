import Button from '@/shared/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { routePaths } from '@/app/routes/path';
import CrewOverview from '@/entities/crew/ui/CrewOverview';
import CrewDetail from '@/entities/crew/ui/CrewDetail';
import Skeleton from '@/shared/ui/Skeleton';
import DetailListSkeleton from '@/shared/ui/DetailListSkeleton';
import { Suspense } from 'react';

function HomePage() {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(routePaths.crewEdit(Number(crewId)));
  };

  return (
    <main className={styles.crewInformation}>
      <div className={styles.overlayImageWrapper}>
        <div className={styles.overlay} />
        <div className={styles.imageWrapper}>
          <Suspense fallback={<Skeleton width="100%" height="100%" />}>
            <CrewOverview crewId={Number(crewId)} />
          </Suspense>
        </div>
      </div>

      <div className={styles.detailContent}>
        <div className={styles.buttons}>
          <Button onClick={handleClickEdit}>수정</Button>
        </div>
        <Suspense fallback={<DetailListSkeleton itemCount={6} />}>
          <CrewDetail crewId={Number(crewId)} />
        </Suspense>
      </div>
    </main>
  );
}

export default HomePage;
