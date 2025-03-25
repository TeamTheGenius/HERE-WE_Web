import { LocationType } from '@/entities/Location/model/types';
import { Card } from '@/shared/ui/Card';
import { Modal } from '@/shared/ui/Modal';
import { TextInput } from '@/shared/ui/TextInput';
import styles from './index.module.scss';

export interface LocationSelectModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const data: LocationType[] = [
  {
    placeName: '장소명1',
    roadAddressName: '도로명1',
    addressName: '지번명1',
    phone: '0101',
    placeURL: 'url1',
    x: 1,
    y: 1,
  },
  {
    placeName: '장소명2',
    roadAddressName: '도로명2',
    addressName: '지번명2',
    phone: '0102',
    placeURL: 'url2',
    x: 2,
    y: 2,
  },
  {
    placeName: '장소명3',
    roadAddressName: '도로명3',
    addressName: '지번명3',
    phone: '0103',
    placeURL: 'url3',
    x: 3,
    y: 3,
  },
  {
    placeName: '장소명4',
    roadAddressName: '도로명4',
    addressName: '지번명4',
    phone: '0104',
    placeURL: 'url4',
    x: 4,
    y: 4,
  },
  {
    placeName: '장소명4',
    roadAddressName: '도로명4',
    addressName: '지번명4',
    phone: '0104',
    placeURL: 'url4',
    x: 4,
    y: 4,
  },
  {
    placeName: '장소명4',
    roadAddressName: '도로명4',
    addressName: '지번명4',
    phone: '0104',
    placeURL: 'url4',
    x: 4,
    y: 4,
  },
];

function LocationSelectModal({ isOpen, handleClose }: LocationSelectModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay handleClick={handleClose} />
      <Modal.Title>장소 검색하기</Modal.Title>
      <Modal.Content>
        <TextInput>
          <TextInput.Label isVisible={false}>장소 검색</TextInput.Label>
          <TextInput.Input type="search" placeholder="어디서 만날까요?" />
        </TextInput>

        {data.map((location, index) => (
          <div key={index}>
            <Card handleClick={() => {}}>
              <Card.Detail>{location.placeName}</Card.Detail>
              <Card.Metadata>{location.roadAddressName}</Card.Metadata>
              <Card.Metadata>{location.addressName}</Card.Metadata>
              <Card.Metadata>{location.phone}</Card.Metadata>
            </Card>
            <u className={styles.underline} />
          </div>
        ))}
      </Modal.Content>
      <Modal.RightButton onClick={handleClose}>닫기</Modal.RightButton>
    </Modal>
  );
}

export default LocationSelectModal;
