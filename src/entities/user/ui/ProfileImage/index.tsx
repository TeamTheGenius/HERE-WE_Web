import { cn } from '../../../../shared/lib/cn.ts';
import { ProfileImageProps } from '../../model/types.ts';
import styles from './index.module.scss';

function ProfileImage({ size, image, alt, className }: ProfileImageProps) {
  return (
    <img
      src={image || 'https://picsum.photos/250/250'}
      alt={alt}
      className={cn(styles.image, styles[`${size}-image`], className)}
    />
  );
}

export default ProfileImage;

// 72 52 36
