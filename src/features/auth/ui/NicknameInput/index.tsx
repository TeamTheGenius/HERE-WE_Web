import type { UseFormReturn } from 'react-hook-form';
import { TextInput } from '../../../../shared/ui/TextInput';
import { UserInfoType } from '../../../../entities/user/model/types';

interface NicknameInputProps {
  formMethods: UseFormReturn<UserInfoType>;
  isSameAsCurrent?: boolean;
}

function NicknameInput({ formMethods, isSameAsCurrent = false }: NicknameInputProps) {
  const {
    register,
    formState: { errors },
    trigger,
  } = formMethods;

  const handleDupllicateCheck = async () => {
    const isValid = await trigger('nickname');
    if (isValid) console.log('Ok');
  };

  const nicknameCheckRegister = register('nickname', {
    pattern: {
      value: /^[가-힣a-zA-Z0-9]{2,20}$/,
      message: '닉네임은 2-20자의 한글, 영문, 숫자만 가능합니다',
    },
    required: {
      value: !isSameAsCurrent,
      message: '닉네임을 입력해주세요',
    },
  });

  return (
    <TextInput>
      <TextInput.Label isRequired={true}>닉네임</TextInput.Label>
      <TextInput.Input
        minLength={2}
        maxLength={20}
        placeholder="닉네임 입력 (2-20자 이내)"
        {...nicknameCheckRegister}
        onInvalid={(e) => e.preventDefault()}
        hasError={!!errors.nickname}
      />
      <TextInput.Button text="중복 확인" onClick={handleDupllicateCheck} disabled={isSameAsCurrent} />
      <TextInput.Message variant="warning">{errors.nickname?.message}</TextInput.Message>
    </TextInput>
  );
}

export default NicknameInput;
