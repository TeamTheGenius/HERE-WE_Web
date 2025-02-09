import Text from '../../components/Text';
import styles from './index.module.scss';

import SocialSignInButton from '../../components/SocialSignInButton';

const SignIn = () => {
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
          <SocialSignInButton variant="google" />
          <SocialSignInButton variant="naver" />
          <SocialSignInButton variant="kakao" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
