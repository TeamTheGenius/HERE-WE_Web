import { ChangeEvent, useRef } from 'react';
import ProfileImage from '../../../../entities/user/ui/ProfileImage';
import Icon from '../../../../shared/ui/Icon';
import styles from './index.module.scss';
import type { EditableProfileImageProps } from '../../model/types';

function ProfileImageInput({ handleImageChange, ...profileImageProps }: EditableProfileImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickFileInput = () => {
    inputRef.current?.click();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleImageChange(file);
  };

  return (
    <button onClick={handleClickFileInput} className={styles.editButton}>
      <ProfileImage {...profileImageProps} />
      <div className={styles.editIcon}>
        <Icon icon="pencil" fill="text-secondary" iconSize="20" />
      </div>
      <input type="file" ref={inputRef} onChange={handleChangeFile} className={styles.editInput} />
    </button>
  );
}

export default ProfileImageInput;
