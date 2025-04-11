import { cn } from '@/shared/lib/cn.ts';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '../../query/userQueries';

export interface ProfileImageProps {
  size: 'small' | 'medium' | 'large';
  alt?: string;
  className?: string;
  userId: number;
}

function ProfileImage({ size, alt = '프로필 사진', className, userId }: ProfileImageProps) {
  const { data } = useQuery({ ...userQueries.profileFile({ userId }) });

  return <img src={data?.source} alt={alt} className={cn(styles.image, styles[`${size}-image`], className)} />;
}

export default ProfileImage;
