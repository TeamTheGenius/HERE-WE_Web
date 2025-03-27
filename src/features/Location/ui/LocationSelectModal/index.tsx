import { Card } from '@/shared/ui/Card';
import { Modal } from '@/shared/ui/Modal';
import { TextInput } from '@/shared/ui/TextInput';
import styles from './index.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { locationListQueries } from '../../query/locationListQueries';
import { Location } from '@/entities/Location/model/types';

export interface LocationSelectModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSelectLocation: (location: Location) => void;
}

function LocationSelectModal({ isOpen, closeModal, handleSelectLocation }: LocationSelectModalProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');

  const { data } = useInfiniteQuery({
    ...locationListQueries.searchLocationWithInfiniteScroll({ page: 1, size: 15, keyword: keyword }),
    enabled: isOpen && keyword.trim().length > 0,
  });

  const handleSearchLocation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = searchInputRef?.current?.value;
    if (!keyword) return;
    setKeyword(keyword);
  };

  const handleCloseModal = () => {
    closeModal();
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setKeyword('');
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={handleCloseModal} />
      <Modal.Title>장소 검색하기</Modal.Title>
      <Modal.Content>
        <form onSubmit={handleSearchLocation}>
          <TextInput>
            <TextInput.Label isVisible={false}>장소 검색</TextInput.Label>
            <TextInput.Input type="search" placeholder="어디서 만날까요?" ref={searchInputRef} />
          </TextInput>
        </form>

        {data &&
          data.pages.map((page, index) =>
            page.content.map((location) => {
              const { placeName, roadAddressName, addressName, phone } = location;
              return (
                <div key={index}>
                  <Card handleClick={() => handleSelectLocation(location)}>
                    <Card.Detail>{placeName}</Card.Detail>
                    <Card.Metadata>{roadAddressName}</Card.Metadata>
                    <Card.Metadata>{addressName}</Card.Metadata>
                    <Card.Metadata>{phone}</Card.Metadata>
                  </Card>
                  <u className={styles.underline} />
                </div>
              );
            }),
          )}
      </Modal.Content>
      <Modal.RightButton onClick={handleCloseModal}>닫기</Modal.RightButton>
    </Modal>
  );
}

export default LocationSelectModal;
