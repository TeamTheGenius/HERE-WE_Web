import { UserInfoType } from '@/entities/user/model/types';
import { useForm } from 'react-hook-form';
import { REGEX, VALIDATION_MESSAGES } from '@/shared/constants/userValidation';
import { getAuthCheckNickname } from '../api/getAuthCheckNickname';
import { isAxiosError } from 'axios';
import { useProfileSubmitValidation } from './useProfileSubmitValidation';
import { useFileInput } from '@/shared/hooks/useFileInput';
import { validateFileSize } from '@/shared/lib/fileValidation';

export const useProfileRegister = (data: UserInfoType) => {
  const formMethods = useForm<UserInfoType>({
    defaultValues: data,
    mode: 'onBlur',
  });
  const { register, trigger, setError, getValues } = formMethods;

  const { updateNicknameDuplicateCheck, updateNicknameUniqueness, isDuplicateChecked, isUnique } =
    useProfileSubmitValidation();

  const { handleFileChange, mergedRef, handleFileInputClick } = useFileInput(register, 'image');

  register('nickname', {
    required: {
      value: true,
      message: VALIDATION_MESSAGES.nickname.required,
    },
    pattern: {
      value: REGEX.nickname,
      message: VALIDATION_MESSAGES.nickname.invalid,
    },
    onChange: () => {
      updateNicknameDuplicateCheck(false);
      updateNicknameUniqueness(false);
    },
  });

  register('image', {
    validate: {
      fileSize: (files: FileList | undefined) => {
        const file = files?.[0];
        if (!file) return true;
        return validateFileSize(file, 5, 'MB');
      },
    },
    onChange: handleFileChange,
  });

  const handleNicknameDuplicateCheck = async () => {
    const isValid = await trigger('nickname');
    if (!isValid) return;

    updateNicknameDuplicateCheck(true);
    const newNickname = getValues('nickname');

    try {
      const { isAvailable } = await getAuthCheckNickname(newNickname);

      if (isAvailable) {
        updateNicknameUniqueness(true);
      }
    } catch (error) {
      if (!isAxiosError(error)) throw error;
      if (error.response?.data?.code === 'NICKNAME_DUPLICATED') {
        setError('nickname', {
          message: VALIDATION_MESSAGES.nickname.duplicate,
        });
        updateNicknameUniqueness(false);
        return;
      }
      throw error;
    }
  };

  const checkCanSubmit = async () => {
    const isValid = await formMethods.trigger();
    if (!isValid) return false;

    if (!isDuplicateChecked) {
      formMethods.setError('nickname', {
        message: VALIDATION_MESSAGES.nickname.notCheck,
      });
      return false;
    }

    if (!isUnique) {
      formMethods.setError('nickname', {
        message: VALIDATION_MESSAGES.nickname.duplicate,
      });
      return false;
    }
    return true;
  };

  return {
    handleNicknameDuplicateCheck,
    checkCanSubmit,
    mergedRef,
    handleFileInputClick,
    formMethods,
    isUnique,
  };
};
