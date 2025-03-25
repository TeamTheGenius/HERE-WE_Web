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

  const { register } = formMethods;

  const { handleFileInputClick, handleFileChange, mergedRef } = useFileInput(register, 'image');

  register('title', {
    pattern: {
      value: REGEX.title,
      message: VALIDATION_MESSAGES.title.invalid,
    },
    required: VALIDATION_MESSAGES.title.required,
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

  register('participantCountLimit', {
    required: VALIDATION_MESSAGES.participantCountLimit.required,
    pattern: {
      value: REGEX.participantCountLimit,
      message: VALIDATION_MESSAGES.participantCountLimit.invalid,
    },
  });

  register('deadlineDateTime', {
    required: VALIDATION_MESSAGES.deadlineDateTime.required,
  });

  register('applicationDeadline', {
    required: VALIDATION_MESSAGES.applicationDeadline.required,
  });

  register('meetingLocation', {
    required: VALIDATION_MESSAGES.meetingLocation.required,
  });

  return { formMethods, handleFileChange, mergedRef, handleFileInputClick };
};
