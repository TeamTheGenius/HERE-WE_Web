import Icon from '@/shared/ui/Icon';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { crewQueries } from '@/entities/crew/query/crewQueries';
import { useParams } from 'react-router-dom';

function BaseCrewHeader() {
  const { crewId } = useParams();

  const { data: crewData } = useQuery({
    ...crewQueries.crewJSON({ crewId: Number(crewId) }),
  });

  return (
    <div className={styles.crewHeader}>
      <h2 className={styles.crewName}>{crewData?.name}</h2>
      <div className={styles.crewInformation}>
        <Icon icon="people-stroke" iconSize="20" color="text-primary" />
        <span className={styles.crewParticipants}>{crewData?.participantCount}명</span>
      </div>
    </div>
  );
}

export default BaseCrewHeader;
