import { type IconType, IconSizeType, TextColorType } from '../../types/design-system';
import styles from './index.module.scss';

interface IconProps {
  icon: IconType;
  fill: TextColorType;
  iconSize: IconSizeType;
}

function Icon({ icon, fill, iconSize }: IconProps) {
  return (
    <svg width={iconSize} height={iconSize} className={styles[`icon--${fill}`]}>
      <use href={`#${icon}`}></use>
    </svg>
  );
}

export default Icon;
