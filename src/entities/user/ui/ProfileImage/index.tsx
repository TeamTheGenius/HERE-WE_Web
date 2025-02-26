import { cn } from '@/shared/lib/cn.ts';
import styles from './index.module.scss';

export interface ProfileImageProps {
  size: 'small' | 'medium' | 'large';
  src?: string;
  alt?: string;
  className?: string;
}

function ProfileImage({ size, src, alt, className }: ProfileImageProps) {
  return <img src={src} alt={alt} className={cn(styles.image, styles[`${size}-image`], className)} />;
}

export default ProfileImage;
