import { useSuspenseQuery } from '@tanstack/react-query';
import { crewQueries } from '../../query/crewQueries';
import styles from './index.module.scss';
import Icon from '@/shared/ui/Icon';

interface CrewOverviewProps {
  crewId: number;
}

function CrewOverview({ crewId }: CrewOverviewProps) {
  const { data: crewDetailImage } = useSuspenseQuery({ ...crewQueries.crewFile({ crewId: Number(crewId) }) });
  const { data: crewDetailJSON } = useSuspenseQuery({ ...crewQueries.crewJSON({ crewId: Number(crewId) }) });

  return (
    <>
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
    </>
  );
}

export default CrewOverview;
