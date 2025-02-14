import type { UseFormReturn } from 'react-hook-form';
import Button from '../../../../shared/ui/Button';
import NicknameInput from '../NicknameInput';
import ProfileImageInput from '../ProfileImageInput';
import styles from './index.module.scss';
import { UserInfoType } from '../../../../entities/user/model/types';

interface UserInfoFormProps {
  submitButtonText: string;
  onSubmit: () => void;
  formMethods: UseFormReturn<UserInfoType>;
}

function UserInfoForm({ onSubmit, formMethods, submitButtonText }: UserInfoFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <ProfileImageInput size="large" formMethods={formMethods} />
      <NicknameInput formMethods={formMethods} />
      <Button variant="primary" size="large" text={submitButtonText} type="submit" />
    </form>
  );
}

export default UserInfoForm;
