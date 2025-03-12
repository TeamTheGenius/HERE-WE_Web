import { useForm } from 'react-hook-form';
import { CrewFormType } from './types';
import { REGEX, VALIDATION_MESSAGES } from '../constants/crewValidation';
import { useFileInput } from '@/shared/hooks/useFileInput';
import { validateFileSize } from '@/shared/lib/fileValidation';

export const useCrewRegister = (data: CrewFormType) => {
  const formMethods = useForm<CrewFormType>({
    defaultValues: data,
    mode: 'onBlur',
  });

  const { register } = formMethods;

  const { handleFileInputClick, handleFileChange, mergedRef } = useFileInput(register, 'image');

  register('title', {
    pattern: {
      value: REGEX.title,
      message: VALIDATION_MESSAGES.title.invalid,
    },
    required: VALIDATION_MESSAGES.title.required,
  });

  register('introduce', {
    pattern: {
      value: REGEX.introduce,
      message: VALIDATION_MESSAGES.introduce.invalid,
    },
  });

  register('image', {
    required: VALIDATION_MESSAGES.image.required,
    validate: {
      fileSize: (files: FileList | undefined) => {
        const file = files?.[0];
        if (!file) return true;
        return validateFileSize(file, 5, 'MB');
      },
    },
    onChange: handleFileChange,
  });

  return { formMethods, handleFileChange, mergedRef, handleFileInputClick };
};
