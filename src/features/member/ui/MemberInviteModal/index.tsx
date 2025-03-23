import { Modal } from '@/shared/ui/Modal';
import MemberInviteForm from '../MemberInviteForm';
import { useForm } from 'react-hook-form';
import { CrewInviteFormType } from '../../model/types';
import { REGEX, VALIDATION_MESSAGES } from '@/shared/constants/userValidation';

interface MemberInviteModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

function MemberInviteModal({ handleClose, isOpen }: MemberInviteModalProps) {
  const formMethods = useForm<CrewInviteFormType>({ defaultValues: { nickname: '' }, mode: 'onBlur' });
  const { register } = formMethods;

  register('nickname', {
    pattern: {
      value: REGEX.nickname,
      message: VALIDATION_MESSAGES.nickname.invalid,
    },
  });

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={handleClose} />
      <Modal.Title>크루원 초대</Modal.Title>
      <Modal.Content>
        <MemberInviteForm formMethods={formMethods} />
      </Modal.Content>
      <Modal.LeftButton handleClick={handleClose}>닫기</Modal.LeftButton>
      <Modal.RightButton handleClick={handleClose}>초대</Modal.RightButton>
    </Modal>
  );
}

export default MemberInviteModal;
