import { Modal } from '@/shared/ui/Modal';
import { ProfileNickname } from '@/entities/user/ui/ProfileNickname';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { momentFeatureQueries } from '../../query/momentFeatureQueries';
import ProfileImageByUserId from '@/entities/user/ui/ProfileImageByUserId';
interface MomentParticipantsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

function MomentParticipantsModal({ isOpen, closeModal }: MomentParticipantsModalProps) {
  const { momentId } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...momentFeatureQueries.participantsInfiniteJSON({ page: 0, size: 6, momentId: Number(momentId) }),
    enabled: isOpen,
  });

  const { rootRef, targetRef } = useInfiniteScroll<HTMLUListElement, HTMLDivElement>({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (!data?.pages) return null;

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={closeModal} />
      <Modal.Title>참여자 목록</Modal.Title>
      <Modal.Content>
        <ul className={styles.participantList} ref={rootRef}>
          {data.pages.map((page) =>
            page.content.map((user) => (
              <li key={user.userId} className={styles.participnatItem}>
                <ProfileImageByUserId size="medium" userId={user.userId} alt="프로필 이미지" />
                <ProfileNickname size="md">{user.name}</ProfileNickname>
              </li>
            )),
          )}
          <div style={{ height: '1px' }} ref={targetRef} />
        </ul>
      </Modal.Content>
      <Modal.RightButton onClick={closeModal}>확인</Modal.RightButton>
    </Modal>
  );
}

export default MomentParticipantsModal;
