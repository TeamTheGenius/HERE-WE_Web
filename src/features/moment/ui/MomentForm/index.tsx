import { TextInput } from '@/shared/ui/TextInput';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { MomentFormType } from '../../model/types';
import { FileInput } from '@/shared/ui/FileInput';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { CrewType } from '@/entities/crew/model/types';

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
  } = formMethods;
  const { name } = crewData;

  const watchedFile = useWatch({ control, name: 'image' });
  const crewImagePreview = useBlobURL(watchedFile?.[0]);

  return (
    <>
      <TextInput>
        <TextInput.Label>크루명 (수정 불가)</TextInput.Label>
        <TextInput.Input value={name} readOnly={true} />
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>모먼트 제목</TextInput.Label>
        <TextInput.Input
          {...register('title')}
          minLength={2}
          maxLength={20}
          hasError={!!errors.title}
          placeholder="모먼트 제목을 입력해주세요"
        />
        {errors.title && <TextInput.Message variant="warning">{errors.title.message}</TextInput.Message>}
      </TextInput>

      <FileInput>
        <FileInput.Title isRequired={true}>썸네일</FileInput.Title>
        <FileInput.Input {...register('image')} ref={mergedRef} />
        <FileInput.Label handleClick={handleFileInputClick} imagePreview={crewImagePreview} />
        {errors.image && <FileInput.Message variant="warning">{errors.image.message}</FileInput.Message>}
      </FileInput>

      <TextInput>
        <TextInput.Label isRequired={true}>만나는 위치</TextInput.Label>
        <TextInput.Input />
        {errors.participantCountLimit && (
          <TextInput.Message variant="warning">{errors.participantCountLimit.message}</TextInput.Message>
        )}
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>만나는 날짜/시간</TextInput.Label>
        <TextInput.Input
          {...register('deadlineDateTime')}
          placeholder="만나는 날짜와 시간을 선택해주세요"
          hasError={!!errors.participantCountLimit}
          type="datetime-local"
        />
        {errors.deadlineDateTime && (
          <TextInput.Message variant="warning">{errors.deadlineDateTime.message}</TextInput.Message>
        )}
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>신청 마감 인원</TextInput.Label>
        <TextInput.Input
          {...register('participantCountLimit')}
          placeholder="신청 마감 인원을 작성해주세요"
          hasError={!!errors.participantCountLimit}
          min={2}
          max={1000}
          type="number"
        />
        {errors.participantCountLimit && (
          <TextInput.Message variant="warning">{errors.participantCountLimit.message}</TextInput.Message>
        )}
      </TextInput>

      <TextInput>
        <TextInput.Label isRequired={true}>신청 마감 날짜/시간</TextInput.Label>
        <TextInput.Input
          {...register('applicationDeadline')}
          placeholder="신청 마감 날짜와 시간을 선택해주세요"
          hasError={!!errors.participantCountLimit}
          type="datetime-local"
        />
        {errors.applicationDeadline && (
          <TextInput.Message variant="warning">{errors.applicationDeadline.message}</TextInput.Message>
        )}
      </TextInput>
    </>
  );
}

export default MomentForm;
