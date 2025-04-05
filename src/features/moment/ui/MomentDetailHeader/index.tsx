import Button, { ButtonType } from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useMomentDetailWithFile } from '@/entities/moment/query/useMomentDetailWithFile';
import { usePostMomentJoin } from '../../query/usePostmomentJoin';
import { useDeleteMomentJoin } from '../../query/useDeleteMomentJoin';

function MomentDetailHeader() {
  const { momentId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const { mutateAsync: joinMoment } = usePostMomentJoin();
  const { mutateAsync: cancelMomentJoin } = useDeleteMomentJoin();

  if (!momentDetail) return null;

  const handleClickJoinButton = async () => {
    await joinMoment({ momentId: Number(momentId) });
  };

  const handleClickCancelButton = async () => {
    await cancelMomentJoin({ momentId: Number(momentId) });
  };

  const getButtonProps = (
    isJoined: boolean,
    isClosed: boolean,
  ): {
    text: string;
    variant: ButtonType;
    onClick?: () => void;
    disabled: boolean;
  } => {
    if (isJoined && isClosed) {
      return {
        text: '참여중',
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
      return { text: '마감', variant: 'primary', disabled: true };
    }

    return {
      text: '참여',
      variant: 'primary',
      onClick: handleClickJoinButton,
      disabled: false,
    };
  };

  const buttonProps = getButtonProps(momentDetail.isJoined, momentDetail.isClosed);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail.name}</h2>
      <div className={styles.buttons}>
        <Button variant="secondary" icon="people-stroke" text={`${momentDetail.participantCount}명`} />
        <Button variant={buttonProps.variant} onClick={buttonProps?.onClick} disabled={buttonProps?.disabled}>
          {buttonProps?.text}
        </Button>
      </div>
    </div>
  );
}

export default MomentDetailHeader;
