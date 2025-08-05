import { useSuspenseQuery } from '@tanstack/react-query';
import { crewQueries } from '../../query/crewQueries';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';

interface CrewDetailProps {
  crewId: number;
}

function CrewDetail({ crewId }: CrewDetailProps) {
  const { data: crewDetailJSON } = useSuspenseQuery({ ...crewQueries.crewJSON({ crewId: Number(crewId) }) });

  return (
    <div className={styles.sectionList}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>소개</h3>
        <p className={cn(styles.introduce, styles.sectionContent)}>{crewDetailJSON?.introduce}</p>
      </div>
    </div>
  );
}

export default CrewDetail;
