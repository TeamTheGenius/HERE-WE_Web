import { type SocialIconType } from '../../types/design-system';
import styles from './index.module.scss';

interface SocialIconProps {
  icon: SocialIconType;
}

function SocialIcon({ icon }: SocialIconProps) {
  return (
    <svg width={20} height={20} className={styles[`icon--${icon}`]}>
      <use href={`#${icon}`}></use>
    </svg>
  );
}

export default SocialIcon;
