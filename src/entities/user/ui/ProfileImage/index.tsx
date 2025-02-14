import { cn } from '../../../../shared/lib/cn.ts';
import { ProfileImageProps } from '../../model/types.ts';
import styles from './index.module.scss';

function ProfileImage({ size, src, alt, className }: ProfileImageProps) {
  return <img src={src} alt={alt} className={cn(styles.image, styles[`${size}-image`], className)} />;
}

export default ProfileImage;

// 72 52 36
