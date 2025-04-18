import { Modal } from '@/shared/ui/Modal';
import { ProfileNickname } from '@/entities/user/ui/ProfileNickname';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { momentFeatureQueries } from '../../query/momentFeatureQueries';
import ProfileImageByUserId from '@/entities/user/ui/ProfileImageByUserId';
import { EmptyState } from '@/shared/ui/EmptyState';
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
      <Modal.Title>모먼트 참여자 목록</Modal.Title>
      <Modal.Content>
        {!data?.pages?.[0]?.content?.length ? (
          <EmptyState>
            <EmptyState.Icon icon="people" iconSize="80" />
            <EmptyState.Description>아직 참여한 크루원이 없습니다</EmptyState.Description>
            <EmptyState.Description>첫 번째 참여자가 되어보세요!</EmptyState.Description>
          </EmptyState>
        ) : (
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
        )}
      </Modal.Content>
      <Modal.RightButton onClick={closeModal}>확인</Modal.RightButton>
    </Modal>
  );
}

export default MomentParticipantsModal;
