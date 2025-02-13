import { useUserInfoForm } from '../../../features/auth/model/useUserInfoForm';
import UserInfoForm from '../../../features/auth/ui/UserInfoForm';

function ProfileUpdateForm() {
  const { image, handleNicknameChange, handleImageChange } = useUserInfoForm();

  const handleSignUp = () => {
    // 이미지와 닉네임 전송
  };

  return (
    <UserInfoForm
      image={image}
      onNicknameChange={handleNicknameChange}
      onImageChange={handleImageChange}
      onSubmit={handleSignUp}
    />
  );
}

export default ProfileUpdateForm;
