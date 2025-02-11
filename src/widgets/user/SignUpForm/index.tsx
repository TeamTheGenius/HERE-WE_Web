import { useUserInfoForm } from '../../../features/auth/model/useUserInfoForm';
import UserInfoForm from '../../../features/auth/ui/UserInfoForm';

function SignUpForm() {
  const { image, nickname, handleNicknameChange, handleImageChange } = useUserInfoForm();

  const handleSignUp = () => {
    // 이미지와 닉네임 전송
    console.log(image, nickname);
  };

  return (
    <UserInfoForm
      image={image}
      handleNicknameChange={handleNicknameChange}
      handleImageChange={handleImageChange}
      onSubmit={handleSignUp}
    />
  );
}

export default SignUpForm;
