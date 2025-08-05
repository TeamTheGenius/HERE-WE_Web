import ScrollableRow from '../ScrollableRow';
import GridContainer from '../GridContainer';
import Skeleton from '../Skeleton';
import styles from './index.module.scss';

export interface CardSkeletonProps {
  size?: 'full' | 'md';
  hasImage?: boolean;
  delay?: number;
}

function CardSkeleton({ size = 'full', hasImage = true, delay }: CardSkeletonProps) {
  return (
    <article>
      <div className={`${size === 'full' ? styles.fullCard : styles.mdCard}`}>
        {/* 이미지 스켈레톤 */}
        {hasImage && (
          <div className={styles.imageContainer}>
            <Skeleton variant="rect" width="100%" height="100%" animation="wave" delay={delay} />
          </div>
        )}

        {/* 콘텐츠 스켈레톤 */}
        <div className={styles.content}>
          <Skeleton variant="rounded" width="100%" height="1.5rem" animation="wave" delay={delay} />
          <Skeleton variant="rounded" width="50%" height="1.5rem" animation="wave" delay={delay} />
        </div>
      </div>
    </article>
  );
}

interface CardListSkeletonProps extends CardSkeletonProps {
  count?: number;
  direction: 'vertical' | 'horizontal' | 'grid';
}

export function CardListSkeleton({ count = 8, hasImage = true, direction, delay }: CardListSkeletonProps) {
  if (direction === 'horizontal') {
    return (
      <ScrollableRow>
        {Array.from({ length: count }, (_, index) => (
          <CardSkeleton key={index} size="md" hasImage={hasImage} delay={delay} />
        ))}
      </ScrollableRow>
    );
  }

  if (direction === 'grid') {
    return (
      <GridContainer>
        {Array.from({ length: count }, (_, index) => (
          <CardSkeleton key={index} size="full" hasImage={hasImage} delay={delay} />
        ))}
      </GridContainer>
    );
  }

  if (direction === 'vertical') {
    return (
      <div className={styles.directionVertical}>
        {Array.from({ length: count }, (_, index) => (
          <CardSkeleton key={index} size="full" hasImage={hasImage} delay={delay} />
        ))}
      </div>
    );
  }
}

export default CardListSkeleton;
