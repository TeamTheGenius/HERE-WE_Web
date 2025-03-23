import { Modal } from '@/shared/ui/Modal';

interface MemberKickModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  nickname: string;
}

function MemberKickModal({ isOpen, handleClose, handleSubmit, nickname }: MemberKickModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={handleClose} />
      <Modal.Title>크루원 내보내기</Modal.Title>
      <Modal.Description>{nickname} 님을 크루에서 내보내시겠습니까?</Modal.Description>
      <Modal.LeftButton onClick={handleClose}>닫기</Modal.LeftButton>
      <Modal.RightButton onClick={handleSubmit}>내보내기</Modal.RightButton>
    </Modal>
  );
}

export default MemberKickModal;
