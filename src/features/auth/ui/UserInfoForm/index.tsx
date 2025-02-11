import Button from '../../../../shared/ui/Button';
import NicknameInput from '../NicknameInput';
import ProfileImageInput from '../ProfileImageInput';
import styles from './index.module.scss';

interface UserInfoFormProps {
  image: string;
  handleImageChange: (file: File) => void;
  handleNicknameChange: (nickname: string) => void;
  onSubmit: () => void;
}

function UserInfoForm({ image, handleImageChange, handleNicknameChange, onSubmit }: UserInfoFormProps) {
  return (
    <form className={styles.wrapper}>
      <ProfileImageInput image={image} handleImageChange={handleImageChange} size="large" />
      <NicknameInput handleNicknameChange={handleNicknameChange} />
      <Button variant="primary" size="large" text="가입하기" onClick={onSubmit} />
    </form>
  );
}

export default UserInfoForm;
