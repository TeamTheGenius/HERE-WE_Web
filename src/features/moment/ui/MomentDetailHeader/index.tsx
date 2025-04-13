import Button, { ButtonProps } from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useMomentDetailWithFile } from '@/entities/moment/query/useMomentDetailWithFile';
import { usePostMomentJoin } from '../../query/usePostmomentJoin';
import { useDeleteMomentJoin } from '../../query/useDeleteMomentJoin';
import { useModal } from '@/shared/hooks/useModal';
import MomentParticipantsModal from '../MomentParticipantsModal';
import { routePaths } from '@/app/routes/path';

function MomentDetailHeader() {
  const { momentId, crewId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const { mutateAsync: joinMoment } = usePostMomentJoin();
  const { mutateAsync: cancelMomentJoin } = useDeleteMomentJoin();
  const { isOpen, closeModal, openModal } = useModal();
  const navigate = useNavigate();

  if (!momentDetail) return null;

  const handleClickJoinButton = async () => {
    await joinMoment({ momentId: Number(momentId) });
  };

  const handleClickCancelButton = async () => {
    await cancelMomentJoin({ momentId: Number(momentId) });
  };

  const getButtonProps = (isJoined: boolean, isClosed: boolean): ButtonProps => {
    if (isJoined && isClosed) {
      return {
        text: '참여완료',
        variant: 'secondary',
        disabled: true,
      };
    }

    if (isJoined && !isClosed) {
      return {
        text: '참여취소',
        variant: 'secondary',
        onClick: handleClickCancelButton,
        disabled: false,
      };
    }

    if (!isJoined && isClosed) {
      return { text: '마감됨', variant: 'secondary', disabled: true };
    }

    return {
      text: '참여하기',
      variant: 'primary',
      onClick: handleClickJoinButton,
      disabled: false,
    };
  };

  const buttonProps = getButtonProps(momentDetail.isJoined, momentDetail.isClosed);

  const handleClickEditButton = () => {
    navigate(routePaths.momentEdit.getPath(Number(crewId), Number(momentId)));
  };

  return (
    <>
      <MomentParticipantsModal isOpen={isOpen} closeModal={closeModal} />

      <div className={styles.container}>
        <h2 className={styles.title}>모먼트 정보</h2>
        <div className={styles.buttons}>
          <Button
            variant="secondary"
            icon="people-stroke"
            onClick={openModal}
            text={`${momentDetail.participantCount}명`}
          />
          <Button variant={buttonProps.variant} onClick={buttonProps?.onClick} disabled={buttonProps?.disabled}>
            {buttonProps?.text}
          </Button>
          {momentDetail.isJoined && (
            <Button onClick={handleClickEditButton} variant="primary">
              수정
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default MomentDetailHeader;
