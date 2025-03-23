import { TextInput } from '@/shared/ui/TextInput';
import { FileInput } from '@/shared/ui/FileInput';
import { TextArea } from '@/shared/ui/TextArea';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { CrewFormType } from '../../model/types';

interface CrewFormProps {
  formMethods: UseFormReturn<CrewFormType>;
  handleFileInputClick: () => void;
  mergedRef: (element: HTMLInputElement) => void;
}

function CrewForm({ formMethods, handleFileInputClick, mergedRef }: CrewFormProps) {
  const {
    formState: { errors },
    register,
    control,
  } = formMethods;

  const watchedFile = useWatch({ control, name: 'image' });
  const crewImagePreview = useBlobURL(watchedFile?.[0]);

  return (
    <>
      <TextInput>
        <TextInput.Label isRequired={true}>크루명</TextInput.Label>
        <TextInput.Input
          minLength={2}
          maxLength={20}
          hasError={!!errors.title}
          placeholder="크루명을 2자~20자 입력해주세요"
          {...register('title')}
        />
        {errors.title && <TextInput.Message variant="warning">{errors.title.message}</TextInput.Message>}
      </TextInput>

      <FileInput>
        <FileInput.Title isRequired={true}>썸네일</FileInput.Title>
        <FileInput.Input {...register('image')} ref={mergedRef} />
        <FileInput.Label handleClick={handleFileInputClick} imagePreview={crewImagePreview} />
        {errors.image && <FileInput.Message variant="warning">{errors.image.message}</FileInput.Message>}
      </FileInput>

      <TextArea>
        <TextArea.Label>소개</TextArea.Label>
        <TextArea.Area
          {...register('introduce')}
          placeholder="크루를 0~1000자로 소개해주세요"
          hasError={!!errors.introduce}
          minLength={0}
          maxLength={1000}
        />
        {errors.introduce && <TextArea.Message variant="warning">{errors.introduce.message}</TextArea.Message>}
      </TextArea>
    </>
  );
}

export default CrewForm;
