import { TextInput } from '../../../../shared/ui/TextInput';

interface NicknameInputProps {
  onNicknameChange: (nickname: string) => void;
}

function NicknameInput({ onNicknameChange }: NicknameInputProps) {
  return (
    <TextInput>
      <TextInput.Label isVisible={false}>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임 입력 (2-20자 이내)" onChange={onNicknameChange} />
      <TextInput.Button text="중복 확인" onClick={() => {}} />
      <TextInput.Message variant="warning">메시지</TextInput.Message>
    </TextInput>
  );
}

export default NicknameInput;
