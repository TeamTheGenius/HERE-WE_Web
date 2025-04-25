import { crewQueries } from '@/entities/crew/query/crewQueries';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { routePaths } from '@/app/routes/path';

function HomePage() {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const { data: crewDetailJSON } = useQuery({ ...crewQueries.crewJSON({ crewId: Number(crewId) }) });
  const { data: crewDetailImage } = useQuery({ ...crewQueries.crewFile({ crewId: Number(crewId) }) });

  const handleClickEdit = () => {
    navigate(routePaths.crewEdit(Number(crewId)));
  };

  return (
    <main className={styles.crewInformation}>
      <div className={styles.overlayImageWrapper}>
        <div className={styles.overlay} />
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={crewDetailImage?.source} alt="크루 썸네일" />

          <div className={styles.overlayContent}>
            <h2 className={styles.name}>{crewDetailJSON?.name}</h2>
            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <Icon icon="crown" iconSize="20" color="text-white" />
                <p className={styles.metaText}>{crewDetailJSON?.leaderNickname}</p>
              </div>
              <div className={styles.metaItem}>
                <Icon icon="people-stroke" iconSize="20" color="text-white" />
                <p className={styles.metaText}> {crewDetailJSON?.participantCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailContent}>
        <div className={styles.buttons}>
          <Button onClick={handleClickEdit}>수정</Button>
        </div>

        <div className={styles.sectionList}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>소개</h3>
            <p className={cn(styles.introduce, styles.sectionContent)}>{crewDetailJSON?.introduce}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
