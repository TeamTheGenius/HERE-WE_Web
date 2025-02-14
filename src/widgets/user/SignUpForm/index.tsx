import { useForm } from 'react-hook-form';
import UserInfoForm from '../../../features/auth/ui/UserInfoForm';
import { UserInfoType } from '../../../entities/user/model/types';

function SignUpForm() {
  const formMethods = useForm<UserInfoType>({ defaultValues: { nickname: '', image: undefined }, mode: 'onChange' });

  const handleSignUp = async () => {
    // 이미지와 닉네임 전송
    const isValid = await formMethods.trigger();
    if (isValid) console.log('OK');
  };

  return <UserInfoForm onSubmit={handleSignUp} formMethods={formMethods} submitButtonText="가입하기" />;
}

export default SignUpForm;
