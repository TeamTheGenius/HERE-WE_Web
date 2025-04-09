import { TextInput } from '@/shared/ui/TextInput';
import { useWatch } from 'react-hook-form';
import { MomentFormType } from '../../model/types';
import { FileInput } from '@/shared/ui/FileInput';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { InputGroup } from '@/shared/ui/InputGroup';
import { useModal } from '@/shared/hooks/useModal';
import LocationSelectModal from '@/features/Location/ui/LocationSelectModal';
import { Location } from '@/entities/Location/model/types';
import { useMomentRegister } from '../../hook/useMomentRegister';
import { useCrewWithFile } from '@/entities/crew/query/useCrewWithFile';
import { useNavigate, useParams } from 'react-router-dom';
import { formatLocalDateTime } from '@/shared/lib/dateFormater';
import { routePaths } from '@/app/routes/path';
import { PostMomentFileRequest } from '@/entities/moment/api/postMomentFile';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { FileType } from '@/shared/types/api';
import { MomentCommonPayload } from '@/entities/moment/model/types';

interface MomentFormProps {
  initialData: MomentFormType;
  handleJSONSubmit: (payload: MomentCommonPayload) => Promise<{ momentId: number }>;
  handleFIleSUbmit: (payload: PostMomentFileRequest) => Promise<FileType>;
  submitButtonText: string;
}

function MomentForm({ initialData, handleJSONSubmit, handleFIleSUbmit, submitButtonText }: MomentFormProps) {
  const { crewId } = useParams();

  const navigate = useNavigate();

  const { data: crewData } = useCrewWithFile(Number(crewId));
  const { formMethods, handleFileInputClick, mergedRef } = useMomentRegister(initialData);

  const {
    formState: { errors },
    control,
    register,
    getValues,
    setValue,
  } = formMethods;

  const watchedFile = useWatch({ control, name: 'image' });
  const momentImagePreview = useBlobURL(watchedFile?.[0]);
  const watchedLocation = useWatch({ control, name: 'place' });

  const { isOpen, closeModal, openModal } = useModal();

  if (!crewData) return;

  const { name } = crewData;

  const handleSelectLocation = (location: Location) => {
    setValue('place', location);
  };

  const onSubmit = async () => {
    const { name, image, capacity, closedAt, meetAt, place } = getValues();
    if (!crewId || !capacity || !place) return;
    const files = image ? [...image] : [];

    const closedAtDate = new Date(closedAt);
    const meetAtDate = new Date(meetAt);
    const formattedClosedAt = formatLocalDateTime(closedAtDate);
    const formattedMeetAt = formatLocalDateTime(meetAtDate);

    const { momentId } = await handleJSONSubmit({
      momentName: name,
      capacity,
      closedAt: formattedClosedAt,
      meetAt: formattedMeetAt,
      place,
    });

    await handleFIleSUbmit({ momentId, files: files });
    navigate(routePaths.momentDetail.getPath(Number(crewId), momentId));
  };

  return (
    <>
      <TitledFormLayout handleSubmit={formMethods.handleSubmit(onSubmit)}>
        <TitledFormLayout.Title>모먼트 생성 페이지</TitledFormLayout.Title>
        <TitledFormLayout.Form>
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
            <FileInput.Label handleClick={handleFileInputClick} imagePreview={momentImagePreview} />
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
                <TextInput.Input
                  value={watchedLocation?.roadAddressName || ''}
                  disabled={true}
                  placeholder="도로명 주소"
                />
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
        </TitledFormLayout.Form>
        <TitledFormLayout.Button>{submitButtonText}</TitledFormLayout.Button>
      </TitledFormLayout>
    </>
  );
}

export default MomentForm;
