import { type SocialIconType } from '../../types/design-system';
import { cn } from '../../utils/cn';
import SocialIcon from '../SocialIcon';
import styles from './index.module.scss';

interface SocialButtonProps {
  variant: 'google' | 'naver' | 'kakao';
  icon: SocialIconType;
  text?: string;
  onClick: () => void;
}

function SocialButton({ variant, text, icon, onClick }: SocialButtonProps) {
  return (
    <button onClick={onClick} className={cn(styles.button, styles[`${variant}-button`])}>
      <SocialIcon icon={icon} />
      {text}
    </button>
  );
}

export default SocialButton;
