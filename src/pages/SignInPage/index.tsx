import SignInForm from '@/widgets/user/SignInForm';
import Logo from '@/shared/ui/Logo';

const SignInPage = () => {
  return (
    <>
      <header className="mb-xl">
        <Logo haveIntroduce={true} size="md" />
      </header>
      <main>
        <SignInForm />
      </main>
    </>
  );
};

export default SignInPage;
