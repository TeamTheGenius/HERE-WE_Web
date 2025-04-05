import Button from '@/shared/ui/Button';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useMomentDetailWithFile } from '@/entities/moment/query/useMomentDetailWithFile';
import { usePostMomentJoin } from '../../query/usePostmomentJoin';
import { deleteMomentJoin } from '../../api/deleteMomentJoin';

function MomentDetailHeader() {
  const { momentId } = useParams();
  const { data: momentDetail } = useMomentDetailWithFile(Number(momentId));
  const { mutateAsync: joinMoment } = usePostMomentJoin();

  if (!momentDetail) return null;

  const handleClickJoinButton = async () => {
    await joinMoment({ momentId: Number(momentId) });
  };

  const handleClickCancelButton = async () => {
    await deleteMomentJoin({ momentId: Number(momentId) });
  };

  const buttonMap = {
    참여가능: {
      text: '참여',
      variant: 'primary',
      onClick: handleClickJoinButton,
      disabled: false,
    },
    참여중: {
      text: '참여취소',
      variant: 'secondary',
      onClick: handleClickCancelButton,
      disabled: false,
    },
    마감: {
      text: '마감',
      variant: 'primary',
      onClick: () => {},
      disabled: true,
    },
  } as const;

  const buttonProps = buttonMap[momentDetail.status];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{momentDetail.name}</h2>
      <div className={styles.buttons}>
        <Button variant="secondary" icon="people-stroke" text={`${momentDetail.participantCount}명`} />
        <Button variant={buttonProps.variant} onClick={buttonProps.onClick} disabled={buttonProps.disabled}>
          {buttonProps.text}
        </Button>
      </div>
    </div>
  );
}

export default MomentDetailHeader;
