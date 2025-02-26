import { useState } from 'react';

export interface ProfileValidationState {
  isDuplicateChecked: boolean;
  isUnique: boolean;
}

export const useProfileSubmitValidation = () => {
  const [profileValidation, setProfileValidation] = useState<ProfileValidationState>({
    isDuplicateChecked: false,
    isUnique: false,
  });

  const updateNicknameDuplicateCheck = (isDuplicateChecked: boolean) => {
    setProfileValidation((prevState) => ({
      ...prevState,
      isDuplicateChecked,
    }));
  };

  const updateNicknameUniqueness = (isUnique: boolean) => {
    setProfileValidation((prevState) => ({
      ...prevState,
      isUnique,
    }));
  };

  return {
    isDuplicateChecked: profileValidation.isDuplicateChecked,
    isUnique: profileValidation.isUnique,
    updateNicknameDuplicateCheck,
    updateNicknameUniqueness,
  };
};
