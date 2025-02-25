import { type IconType, IconSizeType, TextColorType } from '../../types/design-system';
import styles from './index.module.scss';

interface IconProps {
  icon: IconType;
  color: TextColorType;
  iconSize: IconSizeType;
}

function Icon({ icon, color, iconSize }: IconProps) {
  const isStroke = icon.includes('stroke');

  return (
    <svg
      width={iconSize}
      height={iconSize}
      className={styles[isStroke ? `icon-stroke--${color}` : `icon-fill--${color}`]}
    >
      <use href={`#${icon}`}></use>
    </svg>
  );
}

export default Icon;
