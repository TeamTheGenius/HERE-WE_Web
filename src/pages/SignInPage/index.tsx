import SignInSection from '@/widgets/user/SignInSection';
import Logo from '@/shared/ui/Logo';
import styles from './index.module.scss';

const SignInPage = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo haveIntroduce={true} size="md" />
      </header>
      <main>
        <SignInSection />
      </main>
    </>
  );
};

export default SignInPage;
