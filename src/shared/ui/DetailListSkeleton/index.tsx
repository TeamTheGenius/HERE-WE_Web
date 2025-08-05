import Skeleton from '@/shared/ui/Skeleton';
import styles from './index.module.scss';

interface DetailListSkeletonProps {
  itemCount?: number;
  titleWidth?: string;
  contentHeight?: string;
  delay?: number;
}

function DetailListSkeleton({
  itemCount = 3,
  titleWidth = '120px',
  contentHeight = '20px',
  delay,
}: DetailListSkeletonProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className={styles.item}>
          <Skeleton variant="rounded" width={titleWidth} height="2.4rem" delay={delay} className={styles.title} />
          <Skeleton variant="rounded" width="100%" height={contentHeight} delay={delay} className={styles.content} />
        </div>
      ))}
    </div>
  );
}

export default DetailListSkeleton;
