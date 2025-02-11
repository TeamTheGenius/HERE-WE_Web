import SocialButton from '../../../shared/ui/SocialButton';
import { useAuth } from '../../../features/auth/model/useAuth';
import styles from './index.module.scss';

function SignInForm() {
  const { handleSocialSignIn } = useAuth();

  return (
    <div className={styles.container}>
      <SocialButton
        onClick={() => handleSocialSignIn('google')}
        variant="google"
        text="Google로 로그인"
        icon="google"
      />
      <SocialButton onClick={() => handleSocialSignIn('naver')} variant="naver" text="네이버로 로그인" icon="naver" />
      <SocialButton onClick={() => handleSocialSignIn('kakao')} variant="kakao" text="카카오로 로그인" icon="kakao" />
    </div>
  );
}

export default SignInForm;
