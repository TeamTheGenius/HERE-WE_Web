import Icon from '@/shared/ui/Icon';
import styles from './index.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IMAGE_FORMAT } from '@/shared/constants/fileValidation';
import ProfileImageBase from '@/entities/user/ui/ProfileImageBase';

export interface ProfileImageInputProps {
  previewImage: string;
  handleInputClick: () => void;
  mergedRef: (element: HTMLInputElement) => void;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

function ProfileImageInput({ previewImage, handleInputClick, mergedRef, register, error }: ProfileImageInputProps) {
  return (
    <button type="button" onClick={handleInputClick} className={styles.editButton}>
      <ProfileImageBase src={previewImage} size="large" />
      <div className={styles.editIcon}>
        <Icon icon="pencil" color="text-secondary" iconSize="20" />
      </div>
      <input type="file" accept={IMAGE_FORMAT} {...register} ref={mergedRef} className={styles.editInput} />
      {error && <p className={styles.errorText}>{error.message}</p>}
    </button>
  );
}

export default ProfileImageInput;
