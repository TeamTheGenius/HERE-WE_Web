import { useForm } from 'react-hook-form';
import { CrewInviteFormType } from '../model/types';
import { REGEX, VALIDATION_MESSAGES } from '@/shared/constants/userValidation';

export const useCrewInviteRegister = () => {
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

  const handleApiError = (errorCode: string) => {
    if (errorCode === 'MEMBER_NOT_FOUND') {
      setError('nickname', {
        message: '사용자를 찾을 수 없습니다.',
      });
    } else if (errorCode === 'ALREADY_JOINED_CREW') {
      setError('nickname', {
        message: '이미 참여중인 크루입니다.',
      });
    }
  };

  return {
    formMethods,
    handleApiError,
  };
};
