import { cn } from '../../utils/cn';
import SocialIcon from '../SocialIcon';
import styles from './index.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface SocialSignInButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'google' | 'naver' | 'kakao';
  className?: string;
}

function SocialSignInButton({ variant, className, ...rest }: SocialSignInButtonProps) {
  const handleClickSocialSignInButton = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${API_URL}/oauth2/authorization/${variant}`;
  };

  const variants = {
    google: {
      text: 'Google 로그인',
      svgIconId: 'google',
    },
    naver: {
      text: '네이버 로그인',
      svgIconId: 'naver',
    },
    kakao: {
      text: '카카오 로그인',
      svgIconId: 'kakao',
    },
  };

  return (
    <button
      onClick={handleClickSocialSignInButton}
      className={cn(styles.button, styles[`button--${variant}`], className)}
      {...rest}
    >
      <SocialIcon variant={variant} />
      {variants[variant].text}
    </button>
  );
}

export default SocialSignInButton;
