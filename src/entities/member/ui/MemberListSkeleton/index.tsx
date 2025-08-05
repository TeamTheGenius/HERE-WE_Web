import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import Skeleton from '@/shared/ui/Skeleton';

export interface MemberListSkeletonProps {
  count?: number;
  delay?: number;
}

function MemberListSkeleton({ count = 8, delay = 200 }: MemberListSkeletonProps) {
  return (
    <div className={cn(styles.memberListSkeleton)}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.memberItem}>
          <div className={styles.profileInfo}>
            {/* 프로필 이미지 */}
            <Skeleton variant="circle" width="4.2rem" height="4.2rem" delay={delay} />

            <div className={styles.textInfo}>
              {/* 사용자명 라인 */}
              <div className={styles.nameRow}>
                <Skeleton variant="rounded" width="10rem" height="1.6rem" delay={delay} />
              </div>

              {/* 가입일 라인 */}
              <Skeleton variant="rounded" width="100%" height="1.6rem" delay={delay} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberListSkeleton;
