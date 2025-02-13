import Button from '../../../../shared/ui/Button';
import NicknameInput from '../NicknameInput';
import ProfileImageInput from '../ProfileImageInput';
import styles from './index.module.scss';

interface UserInfoFormProps {
  image: string;
  onImageChange: (file: File) => void;
  onNicknameChange: (nickname: string) => void;
  onSubmit: () => void;
}

function UserInfoForm({ image, onImageChange, onNicknameChange, onSubmit }: UserInfoFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <ProfileImageInput image={image} onImageChange={onImageChange} size="large" />
      <NicknameInput onNicknameChange={onNicknameChange} />
      <Button variant="primary" size="large" text="가입하기" type="submit" />
    </form>
  );
}

export default UserInfoForm;
