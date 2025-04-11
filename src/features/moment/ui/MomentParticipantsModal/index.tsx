import { Modal } from '@/shared/ui/Modal';
import temp from '@/shared/assets/temp.jpg';
import ProfileImage from '@/entities/user/ui/ProfileImage';
import { ProfileNickname } from '@/entities/user/ui/ProfileNickname';
import styles from './index.module.scss';
interface MomentParticipantsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const mock = [
  {
    nickname: 'test1',
    image: temp,
  },
  {
    nickname: 'test2',
    image: temp,
  },
];

function MomentParticipantsModal({ isOpen, closeModal }: MomentParticipantsModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={closeModal} />
      <Modal.Title>참여자 목록</Modal.Title>
      <Modal.Content>
        <ul className={styles.participantList}>
          {mock.map((item, index) => (
            <li key={index} className={styles.participnatItem}>
              <ProfileImage size="medium" src={item.image} alt="프로필 이미지" />
              <ProfileNickname size="md">{item.nickname}</ProfileNickname>
            </li>
          ))}
        </ul>
      </Modal.Content>
      <Modal.RightButton onClick={closeModal}>확인</Modal.RightButton>
    </Modal>
  );
}

export default MomentParticipantsModal;
