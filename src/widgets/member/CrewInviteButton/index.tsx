import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useModal } from '@/shared/hooks/useModal';
import CrewInviteModal from '@/features/member/ui/MemberInviteModal';

function CrewInviteButton() {
  const { openModal, closeModal, isOpen } = useModal();
  return (
    <>
      <CrewInviteModal handleClose={closeModal} isOpen={isOpen} />
      <Button className={styles.inviteButton} onClick={openModal}>
        + 초대
      </Button>
    </>
  );
}

export default CrewInviteButton;
