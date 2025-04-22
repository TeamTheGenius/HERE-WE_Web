import { useForm } from 'react-hook-form';
import { CrewInviteFormType } from '../model/types';
import { REGEX, VALIDATION_MESSAGES } from '@/shared/constants/userValidation';
import { isAxiosError } from 'axios';
import { ERROR_CODES } from '@/shared/api/error.constant';
import { API_ERRORS } from '@/shared/api/errorMap.type';
import { useState } from 'react';

export const useCrewInviteRegister = () => {
  const [uncaughtError, setUncaughtError] = useState<unknown | null>(null);

  // 처리되지 않은 에러가 있으면 렌더링 과정에서 에러 던지기
  if (uncaughtError) throw uncaughtError;

  const formMethods = useForm<CrewInviteFormType>({
    defaultValues: { nickname: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const { register, setError } = formMethods;
  register('nickname', {
    required: {
      value: true,
      message: VALIDATION_MESSAGES.nickname.required,
    },
    pattern: {
      value: REGEX.nickname,
      message: VALIDATION_MESSAGES.nickname.invalid,
    },
  });

  const handleApiError = (error: unknown) => {
    if (!isAxiosError(error)) {
      setUncaughtError(error);
      return;
    }

    const errorCode = error.response?.data?.code;
    const errorInfo = API_ERRORS[errorCode];

    switch (errorCode) {
      case ERROR_CODES.MEMBER_NOT_FOUND:
        setError('nickname', {
          message: errorInfo.message,
        });
        break;

      case ERROR_CODES.ALREADY_JOINED_CREW:
        setError('nickname', {
          message: errorInfo.message,
        });
        break;

      default:
        setUncaughtError(error);
    }
  };

  return {
    formMethods,
    handleApiError,
  };
};
