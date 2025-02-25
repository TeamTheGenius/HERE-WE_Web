import { useForm } from 'react-hook-form';
import UserInfoForm from '@/features/auth/ui/UserInfoForm';
import { UserInfoType } from '@/entities/user/model/types';
import { useProfileValidation } from '@/features/auth/model/useProfileValidation';

function ProfileUpdateForm() {
  const formMethods = useForm<UserInfoType>({ defaultValues: { nickname: '', image: undefined }, mode: 'onChange' });
  const profileValidation = useProfileValidation();

  const handleSignUp = () => {
    // 이미지와 닉네임 전송
  };

  return (
    <UserInfoForm
      onSubmit={handleSignUp}
      formMethods={formMethods}
      submitButtonText="수정하기"
      profileValidation={profileValidation}
    />
  );
}

export default ProfileUpdateForm;
