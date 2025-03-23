import { Modal } from '@/shared/ui/Modal';
import { useEffect, useId } from 'react';
import { useParams } from 'react-router-dom';
import { usePostCrewInvite } from '../../query/usePostCrewInvite';
import { useCrewInviteRegister } from '../../hooks/useCrewInviteRegister';
import { AxiosError } from 'axios';
import MemberInviteNicknameInput from '../MemberInviteNicknameInput';

interface MemberInviteModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

function MemberInviteModal({ handleClose, isOpen }: MemberInviteModalProps) {
  const formId = useId();
  const { crewId } = useParams();
  const { mutateAsync } = usePostCrewInvite();
  const { formMethods, handleApiError } = useCrewInviteRegister();
  const { reset, handleSubmit, getValues } = formMethods;

  useEffect(() => {
    reset();
  }, [isOpen]);

  const onSubmit = async () => {
    if (!crewId) return;
    const nickname = getValues('nickname');
    try {
      await mutateAsync({ crewId: Number(crewId), nickname });
      reset();
      // 성공 토스트 메시지 띄우기
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
      const errorCode = error.response?.data?.code;
      handleApiError(errorCode);
      throw error;
    }
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
