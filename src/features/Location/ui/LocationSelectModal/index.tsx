import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';
import { Location } from '@/entities/Location/model/types';
import LocationSearchForm from '../LocationSearchForm';

export interface LocationSelectModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSelectLocation: (location: Location) => void;
}

function LocationSelectModal({ isOpen, closeModal, handleSelectLocation }: LocationSelectModalProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmitKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={handleCloseModal} />
      <Modal.Title>장소 검색하기</Modal.Title>
      <Modal.Content>
        <LocationSearchForm
          keyword={keyword}
          handleSubmitKeyword={handleSubmitKeyword}
          handleSelectLocation={handleSelectLocation}
        />
      </Modal.Content>
      <Modal.RightButton onClick={handleCloseModal}>닫기</Modal.RightButton>
    </Modal>
  );
}

export default LocationSelectModal;
