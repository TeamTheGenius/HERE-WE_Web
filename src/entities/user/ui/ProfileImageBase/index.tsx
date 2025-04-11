import { cn } from '@/shared/lib/cn.ts';
import styles from './index.module.scss';

export interface ProfileImageBaseProps {
  size: 'small' | 'medium' | 'large';
  alt?: string;
  className?: string;
  src: string;
}

function ProfileImageBase({ size, alt = '프로필 사진', className, src }: ProfileImageBaseProps) {
  return <img src={src} alt={alt} className={cn(styles.image, styles[`${size}-image`], className)} />;
}

export default ProfileImageBase;
