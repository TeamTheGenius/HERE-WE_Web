import Logo from '../../shared/ui/Logo';
import SignUpForm from '../../widgets/user/SignUpForm';

function SignUpPage() {
  return (
    <>
      <header className="mb-xl">
        <Logo haveIntroduce={false} size="md" />
      </header>
      <main>
        <SignUpForm />
      </main>
    </>
  );
}

export default SignUpPage;
