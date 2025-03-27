import { TextInput } from '@/shared/ui/TextInput';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { MomentFormType } from '../../model/types';
import { FileInput } from '@/shared/ui/FileInput';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { CrewType } from '@/entities/crew/model/types';
import { InputGroup } from '@/shared/ui/InputGroup';
import { useModal } from '@/shared/hooks/useModal';
import LocationSelectModal from '@/features/Location/ui/LocationSelectModal';
import { Location } from '@/entities/Location/model/types';

interface MomentFormProps {
  formMethods: UseFormReturn<MomentFormType>;
  handleFileInputClick: () => void;
  mergedRef: (element: HTMLInputElement) => void;
  crewData: CrewType;
}

function MomentForm({ formMethods, handleFileInputClick, mergedRef, crewData }: MomentFormProps) {
  const {
    formState: { errors },
    control,
    register,
    setValue,
  } = formMethods;
  const { name } = crewData;

  const watchedFile = useWatch({ control, name: 'image' });
  const crewImagePreview = useBlobURL(watchedFile?.[0]);
  const watchedLocation = useWatch({ control, name: 'place' });
  const { isOpen, closeModal, openModal } = useModal();

  const handleSelectLocation = (location: Location) => {
    setValue('place', location);
  };

  return (
    <>
      <LocationSelectModal isOpen={isOpen} closeModal={closeModal} handleSelectLocation={handleSelectLocation} />

      <TextInput>
        <TextInput.Label>크루명 (수정 불가)</TextInput.Label>
        <TextInput.Input value={name} readOnly={true} />
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>모먼트 제목</TextInput.Label>
        <TextInput.Input
          {...register('name')}
          minLength={2}
          maxLength={20}
          hasError={!!errors.name}
          placeholder="모먼트 제목을 입력해주세요"
        />
        {errors.name && <TextInput.Message variant="warning">{errors.name.message}</TextInput.Message>}
      </TextInput>

      <FileInput>
        <FileInput.Title isRequired={true}>썸네일</FileInput.Title>
        <FileInput.Input {...register('image')} ref={mergedRef} />
        <FileInput.Label handleClick={handleFileInputClick} imagePreview={crewImagePreview} />
        {errors.image && <FileInput.Message variant="warning">{errors.image.message}</FileInput.Message>}
      </FileInput>

      <InputGroup>
        <InputGroup.Title isRequired={true}>만나는 위치</InputGroup.Title>
        <InputGroup.Content>
          <TextInput>
            <TextInput.Label isRequired={true} isVisible={false}>
              장소명
            </TextInput.Label>
            <TextInput.Input
              value={watchedLocation?.placeName || ''}
              disabled={true}
              hasError={!!errors.place}
              placeholder="장소명"
            />
            <TextInput.Button type="button" onClick={openModal}>
              장소 검색
            </TextInput.Button>
          </TextInput>
          <TextInput>
            <TextInput.Label isVisible={false}>도로명 주소</TextInput.Label>
            <TextInput.Input value={watchedLocation?.roadAddressName || ''} disabled={true} placeholder="도로명 주소" />
          </TextInput>

          <TextInput>
            <TextInput.Label isVisible={false}>지번 주소</TextInput.Label>
            <TextInput.Input value={watchedLocation?.addressName || ''} disabled={true} placeholder="지번 주소" />
          </TextInput>
          {errors.place && <TextInput.Message variant="warning">{errors.place.message}</TextInput.Message>}
        </InputGroup.Content>
      </InputGroup>

      <TextInput>
        <TextInput.Label isRequired={true}>만나는 날짜/시간</TextInput.Label>
        <TextInput.Input
          {...register('meetAt')}
          placeholder="만나는 날짜와 시간을 선택해주세요"
          hasError={!!errors.meetAt}
          type="datetime-local"
        />
        {errors.meetAt && <TextInput.Message variant="warning">{errors.meetAt.message}</TextInput.Message>}
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>신청 마감 인원</TextInput.Label>
        <TextInput.Input
          {...register('capacity')}
          placeholder="신청 마감 인원을 작성해주세요"
          hasError={!!errors.capacity}
          min={2}
          max={1000}
          type="number"
        />
        {errors.capacity && <TextInput.Message variant="warning">{errors.capacity.message}</TextInput.Message>}
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>신청 마감 날짜/시간</TextInput.Label>
        <TextInput.Input
          {...register('closedAt')}
          placeholder="신청 마감 날짜와 시간을 선택해주세요"
          hasError={!!errors.closedAt}
          type="datetime-local"
        />
        {errors.closedAt && <TextInput.Message variant="warning">{errors.closedAt.message}</TextInput.Message>}
      </TextInput>
    </>
  );
}

export default MomentForm;
