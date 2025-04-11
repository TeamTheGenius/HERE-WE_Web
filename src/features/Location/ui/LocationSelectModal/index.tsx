import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';
import { Location } from '@/entities/Location/model/types';
import LocationSearchForm from '../LocationSearchForm';
import { Card } from '@/shared/ui/Card';
import styles from './index.module.scss';
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
        <div className={styles.modalContent}>
          <LocationSearchForm keyword={keyword} handleSubmitKeyword={handleSubmitKeyword}>
            {(location) => {
              const { id, placeName, roadAddressName, addressName, phone } = location;
              return (
                <article key={id}>
                  <Card handleClick={() => handleSelectLocation(location)}>
                    <Card.Text>
                      <Card.Detail>{placeName}</Card.Detail>
                      <Card.Metadata>도로명: {roadAddressName}</Card.Metadata>
                      <Card.Metadata>지번: {addressName}</Card.Metadata>
                      <Card.Metadata>연락처: {phone}</Card.Metadata>
                    </Card.Text>
                  </Card>
                </article>
              );
            }}
          </LocationSearchForm>
        </div>
      </Modal.Content>
      <Modal.RightButton onClick={handleCloseModal}>닫기</Modal.RightButton>
    </Modal>
  );
}

export default LocationSelectModal;
