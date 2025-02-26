import Logo from '@/shared/ui/Logo';
import styles from './index.module.scss';
import SignUpSection from '@/widgets/user/SignUpSection';

function SignUpPage() {
  return (
    <>
      <header className={styles.header}>
        <Logo haveIntroduce={false} size="lg" />
      </header>
      <main>
        <SignUpSection />
      </main>
    </>
  );
}

export default SignUpPage;
