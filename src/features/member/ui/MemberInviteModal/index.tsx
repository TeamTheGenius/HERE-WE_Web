import { Modal } from '@/shared/ui/Modal';
import { useEffect, useId } from 'react';
import { useParams } from 'react-router-dom';
import { usePostCrewInvite } from '../../query/usePostCrewInvite';
import { useCrewInviteRegister } from '../../hooks/useCrewInviteRegister';
import MemberInviteNicknameInput from '../MemberInviteNicknameInput';
import { useAddToast } from '@/shared/hooks/useToast';

interface MemberInviteModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

function MemberInviteModal({ handleClose, isOpen }: MemberInviteModalProps) {
  const formId = useId();
  const { crewId } = useParams();
  const { formMethods, handleApiError } = useCrewInviteRegister();
  const { mutateAsync } = usePostCrewInvite({ onError: (error: unknown) => handleApiError(error) });
  const { reset, handleSubmit, getValues } = formMethods;
  const addToast = useAddToast();

  useEffect(() => {
    reset();
  }, [isOpen]);

  const onSubmit = async () => {
    if (!crewId) return;
    const nickname = getValues('nickname');

    await mutateAsync({ crewId: Number(crewId), nickname });
    reset();
    addToast({
      type: 'success',
      message: `'${nickname}'님을 초대했어요`,
    });
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={handleClose} />
      <Modal.Title>크루원 초대</Modal.Title>
      <Modal.Description>메일이 오지 않았을 경우 스팸함을 확인해주세요</Modal.Description>
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} id={formId}>
          <MemberInviteNicknameInput formMethods={formMethods} />
        </form>
      </Modal.Content>
      <Modal.LeftButton onClick={handleClose}>닫기</Modal.LeftButton>
      <Modal.RightButton type="submit" form={formId}>
        초대
      </Modal.RightButton>
    </Modal>
  );
}

export default MemberInviteModal;
