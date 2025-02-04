import Text from '../../components/Text';
import styles from './index.module.scss';
import googleLogo from '../../assets/icon/google.svg';
import kakaoLogo from '../../assets/icon/kakao.svg';
import naverLogo from '../../assets/icon/naver.svg';
import { cn } from '../../utils/cn';

const SignIn = () => {
  function handleClickSocialSignInButton(provider: 'kakao' | 'naver' | 'google') {
    const API_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${API_URL}/oauth2/authorization/${provider}`;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.serviceInformationContainer}>
          <Text as="h2" font="heading-small" color="primary">
            모임을 더 쉽게, 소중한 순간은 더 오래
          </Text>
          <Text as="h1" font="display-large" color="brand">
            HEAR:WE
          </Text>
        </header>
        <div className={styles.signinContainer}>
          <button
            onClick={() => handleClickSocialSignInButton('google')}
            className={cn(styles.gooogleSigninButton, styles.signinButton)}
          >
            <img src={googleLogo} alt=""></img>Google 로그인
          </button>
          <button
            onClick={() => handleClickSocialSignInButton('naver')}
            className={cn(styles.naverSigninButton, styles.signinButton)}
          >
            <img src={naverLogo} alt=""></img>네이버 로그인
          </button>
          <button
            onClick={() => handleClickSocialSignInButton('kakao')}
            className={cn(styles.kakaoSigninButton, styles.signinButton)}
          >
            <img src={kakaoLogo} alt=""></img>카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
