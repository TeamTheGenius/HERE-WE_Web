import { useSuspenseQuery } from '@tanstack/react-query';
import styles from './index.module.scss';
import { momentQueries } from '../../query/momentQueries';

interface MomentPlaceTitleProps {
  momentId: number;
}

function MomentPlaceTitle({ momentId }: MomentPlaceTitleProps) {
  const { data: momentDetail } = useSuspenseQuery({ ...momentQueries.momentJSON({ momentId: Number(momentId) }) });

  return <h2 className={styles.title}>{momentDetail?.name}</h2>;
}

export default MomentPlaceTitle;
