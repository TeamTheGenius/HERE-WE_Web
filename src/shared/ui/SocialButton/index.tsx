import { cn } from '../../lib/cn';
import { SocialIconType } from '../../types/design-system';
import SocialIcon from '../SocialIcon';
import styles from './index.module.scss';

type SocialButtonType = 'google' | 'naver' | 'kakao';

interface SocialButtonProps {
  variant: SocialButtonType;
  text: string;
  onClick: () => void;
}

const ICON_MAP: Record<SocialButtonType, SocialIconType> = {
  google: 'google',
  naver: 'naver',
  kakao: 'kakao',
};

function SocialButton({ variant, text, onClick }: SocialButtonProps) {
  return (
    <button onClick={onClick} className={cn(styles.button, styles[`${variant}-button`])}>
      <SocialIcon icon={ICON_MAP[variant]} />
      {text}
    </button>
  );
}

export default SocialButton;
