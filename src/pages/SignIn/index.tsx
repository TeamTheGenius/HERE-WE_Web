import SocialButton from '../../components/SocialButton';
import Text from '../../components/Text';
import { useTheme } from '../../hooks/useTheme';
import styles from './index.module.scss';

const SignIn = () => {
  const { toggleTheme } = useTheme();

  const handleSocialSignIn = (variant: 'naver' | 'kakao' | 'google') => {
    const API_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${API_URL}/oauth2/authorization/${variant}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button onClick={toggleTheme}>테마토글</button>
        <header className={styles.serviceInformationContainer}>
          <Text as="h2" font="heading-small" color="text-primary">
            모임을 더 쉽게, 소중한 순간은 더 오래
          </Text>
          <Text as="h1" font="display-large" color="text-brand">
            HEAR:WE
          </Text>
        </header>
        <div className={styles.signinContainer}>
          <SocialButton
            onClick={() => handleSocialSignIn('google')}
            variant="google"
            text="Google로 로그인"
            icon="google"
          />
          <SocialButton
            onClick={() => handleSocialSignIn('naver')}
            variant="naver"
            text="네이버로 로그인"
            icon="naver"
          />
          <SocialButton
            onClick={() => handleSocialSignIn('kakao')}
            variant="kakao"
            text="카카오로 로그인"
            icon="kakao"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
