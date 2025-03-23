import { TextInput } from '@/shared/ui/TextInput';
import { UseFormReturn } from 'react-hook-form';
import { CrewInviteFormType } from '../../model/types';

interface MemberInviteFormProps {
  formMethods: UseFormReturn<CrewInviteFormType>;
}

function MemberInviteNicknameInput({ formMethods }: MemberInviteFormProps) {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <TextInput>
      <TextInput.Label isVisible={false}>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임 입력" hasError={!!errors.nickname} {...register('nickname')} />
      {errors.nickname && <TextInput.Message variant="warning">{errors.nickname.message}</TextInput.Message>}
    </TextInput>
  );
}

export default MemberInviteNicknameInput;
