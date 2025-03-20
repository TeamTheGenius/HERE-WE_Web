import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { TextInput } from '@/shared/ui/TextInput';

interface ProfileNicknameInputProps {
  isUnique: boolean;
  register: UseFormRegisterReturn;
  initialNickname?: string;
  watchedNickname: string;
  handleDupllicateCheck: () => void;
  error: FieldError | undefined;
}

function ProfileNicknameInput({
  register,
  initialNickname = '',
  handleDupllicateCheck,
  error,
  watchedNickname,
  isUnique,
}: ProfileNicknameInputProps) {
  return (
    <TextInput>
      <TextInput.Label isRequired={true}>닉네임</TextInput.Label>
      <TextInput.Input
        minLength={2}
        maxLength={20}
        placeholder="2-20자의 한글, 영문, 숫자로 입력해주세요"
        {...register}
        onInvalid={(e) => e.preventDefault()}
        hasError={!!error}
      />
      <TextInput.Button
        text="중복 확인"
        onClick={handleDupllicateCheck}
        disabled={watchedNickname === initialNickname}
        type="button"
      />
      {error ? (
        <TextInput.Message variant="warning">{error.message}</TextInput.Message>
      ) : isUnique ? (
        <TextInput.Message variant="success">사용 가능한 닉네임입니다.</TextInput.Message>
      ) : null}
    </TextInput>
  );
}

export default ProfileNicknameInput;
