import Skeleton from '@/shared/ui/Skeleton';
import styles from './index.module.scss';

interface MomentInformationSkeletonProps {
  delay?: number;
}

function MomentInformationSkeleton({ delay }: MomentInformationSkeletonProps) {
  return (
    <div className={styles.container}>
      {/* 썸네일 스켈레톤 */}
      <Skeleton className={styles.thumbnail} variant="rounded" delay={delay} />

      {/* 필드 컨테이너 스켈레톤 */}
      <div className={styles.fieldContainer}>
        {/* 모먼트명 필드 */}
        <div className={styles.field}>
          <Skeleton className={styles.fieldTitle} width="10rem" height="1.75rem" variant="rounded" delay={delay} />
          <div className={styles.fieldContent}>
            <Skeleton width="100%" height="1.5rem" variant="rounded" delay={delay} />
          </div>
        </div>

        {/* 만나는 날짜 필드 */}
        <div className={styles.field}>
          <Skeleton className={styles.fieldTitle} width="10rem" height="1.75rem" variant="rounded" delay={delay} />
          <div className={styles.fieldContent}>
            <Skeleton width="75%" height="1.5rem" variant="rounded" delay={delay} />
          </div>
        </div>

        {/* 만나는 장소 필드 */}
        <div className={styles.field}>
          <Skeleton className={styles.fieldTitle} width="10rem" height="1.75rem" variant="rounded" delay={delay} />
          <div className={styles.fieldContent}>
            <Skeleton width="90%" height="1.5rem" variant="rounded" delay={delay} />
            <Skeleton width="100%" height="1.25rem" variant="rounded" delay={delay} />
            <Skeleton width="80%" height="1.25rem" variant="rounded" delay={delay} />
            <Skeleton width="70%" height="1.25rem" variant="rounded" delay={delay} />
          </div>
        </div>

        {/* 참여/마감 인원 필드 */}
        <div className={styles.field}>
          <Skeleton className={styles.fieldTitle} width="10rem" height="1.75rem" variant="rounded" delay={delay} />
          <div className={styles.fieldContent}>
            <Skeleton width="50%" height="1.5rem" variant="rounded" delay={delay} />
          </div>
        </div>

        {/* 신청 마감 날짜 필드 */}
        <div className={styles.field}>
          <Skeleton className={styles.fieldTitle} width="10rem" height="1.75rem" variant="rounded" delay={delay} />
          <div className={styles.fieldContent}>
            <Skeleton width="75%" height="1.5rem" variant="rounded" delay={delay} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MomentInformationSkeleton;
