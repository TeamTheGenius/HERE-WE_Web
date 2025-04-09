import { useForm } from 'react-hook-form';
import { useFileInput } from '@/shared/hooks/useFileInput';
import { validateFileSize } from '@/shared/lib/fileValidation';
import { REGEX, VALIDATION_MESSAGES } from '../constant/momentValidation';
import { MomentFormType } from '../model/types';

export const useMomentRegister = (data: MomentFormType) => {
  const formMethods = useForm<MomentFormType>({
    defaultValues: data,
    mode: 'onBlur',
  });

  const { register, getValues } = formMethods;
  const { handleFileInputClick, handleFileChange, mergedRef } = useFileInput(register, 'image', data?.image?.[0]);

  const isAfterNow = (value: string) => {
    const now = new Date();
    const selectedDate = new Date(value);
    return selectedDate > now;
  };

  register('name', {
    pattern: {
      value: REGEX.name,
      message: VALIDATION_MESSAGES.name.invalid,
    },
    required: VALIDATION_MESSAGES.name.required,
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

  register('capacity', {
    required: VALIDATION_MESSAGES.capacity.required,
    pattern: {
      value: REGEX.capacity,
      message: VALIDATION_MESSAGES.capacity.invalid,
    },
  });

  register('meetAt', {
    required: VALIDATION_MESSAGES.meetAt.required,
    validate: {
      isAfterNow: (value) => {
        if (!isAfterNow(value)) {
          return VALIDATION_MESSAGES.meetAt.invalid;
        }
        return true;
      },
    },
  });

  register('closedAt', {
    required: VALIDATION_MESSAGES.closedAt.required,
    validate: {
      isAfterNow: (value) => {
        if (!isAfterNow(value)) {
          return VALIDATION_MESSAGES.closedAt.invalid;
        }
        return true;
      },
      isClosedBeforeMeetAt: (value) => {
        const { meetAt } = getValues();
        if (meetAt && new Date(meetAt) <= new Date(value)) {
          return VALIDATION_MESSAGES.closedAt.invalidOrder;
        }
        return true;
      },
    },
  });

  register('place', {
    required: VALIDATION_MESSAGES.place.required,
  });

  return { formMethods, handleFileChange, mergedRef, handleFileInputClick };
};
