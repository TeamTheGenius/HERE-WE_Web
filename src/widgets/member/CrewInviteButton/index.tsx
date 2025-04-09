import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useModal } from '@/shared/hooks/useModal';
import CrewInviteModal from '@/features/member/ui/MemberInviteModal';
import { useQuery } from '@tanstack/react-query';
import { crewFeatureQueries } from '@/features/crew/query/crewFeatureQueries';
import { useParams } from 'react-router-dom';

function CrewInviteButton() {
  const { crewId } = useParams();
  const { openModal, closeModal, isOpen } = useModal();
  const { data: crewProfile } = useQuery({ ...crewFeatureQueries.myCrewProfile({ crewId: Number(crewId) }) });

  return (
    <>
      {crewProfile?.role === 'LEADER' && (
        <>
          <CrewInviteModal handleClose={closeModal} isOpen={isOpen} />
          <Button className={styles.inviteButton} onClick={openModal}>
            + 초대
          </Button>
        </>
      )}
    </>
  );
}

export default CrewInviteButton;
