import styles from './index.module.scss';

interface SocialIconProps {
  variant: 'google' | 'naver' | 'kakao';
}

function SocialIcon({ variant }: SocialIconProps) {
  return (
    <svg width={20} height={20} className={styles[`icon--${variant}`]}>
      <use href={`#${variant}`}></use>
    </svg>
  );
}

export default SocialIcon;
