import ProfileImage from '../../../../entities/user/ui/ProfileImage';
import Icon from '../../../../shared/ui/Icon';
import styles from './index.module.scss';
import type { ProfileImageInputProps } from '../../model/types';
import { useFileInput } from '../../../../shared/hooks/useFileInput';

function ProfileImageInput({ formMethods, ...profileImageProps }: ProfileImageInputProps) {
  const {
    register,
    formState: { errors },
  } = formMethods;
  const { previousImage, handlers } = useFileInput(register, 'image');

  return (
    <button type="button" onClick={handlers.handleInputClick} className={styles.editButton}>
      <ProfileImage src={previousImage.src} {...profileImageProps} />
      <div className={styles.editIcon}>
        <Icon icon="pencil" fill="text-secondary" iconSize="20" />
      </div>
      <input
        type="file"
        accept="image/*"
        {...handlers.fileRegister}
        ref={handlers.handleFileInputRef}
        className={styles.editInput}
      />
      {errors.image && <p className={styles.errorText}>{errors.image.message}</p>}
    </button>
  );
}

export default ProfileImageInput;
