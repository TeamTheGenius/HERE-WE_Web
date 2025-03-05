import { cn } from '@/shared/lib/cn';
import { type IconType, IconSizeType, TextColorType } from '../../types/design-system';
import styles from './index.module.scss';

interface IconProps {
  icon: IconType;
  color: TextColorType;
  iconSize: IconSizeType;
  rotate?: 90 | 180 | 270;
}

function Icon({ icon, color, iconSize, rotate }: IconProps) {
  const isStroke = icon.includes('stroke');
  const baseClassName = isStroke ? `icon-stroke--${color}` : `icon-fill--${color}`;
  const rotateClassName = rotate ? styles[`rotate-${rotate}`] : '';

  return (
    <svg width={iconSize} height={iconSize} className={cn(styles[baseClassName], rotateClassName)}>
      <use href={`#${icon}`}></use>
    </svg>
  );
}

export default Icon;
