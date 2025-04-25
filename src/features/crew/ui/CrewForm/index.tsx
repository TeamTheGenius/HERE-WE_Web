import { TextInput } from '@/shared/ui/TextInput';
import { FileInput } from '@/shared/ui/FileInput';
import { TextArea } from '@/shared/ui/TextArea';
import { useWatch } from 'react-hook-form';
import { useBlobURL } from '@/shared/hooks/useBlobURL';
import { CrewFormType } from '../../model/types';
import { useCrewRegister } from '../../model/useCrewRegister';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';
import { TitledFormLayout } from '@/shared/ui/TitledFormLayout';
import { FileMutationRequest } from '@/shared/types/api';
import { CrewJSONMutationRequest } from '@/entities/crew/model/types';

interface CrewFormProps {
  initialData: CrewFormType;
  handleJSONSubmit: (payload: CrewJSONMutationRequest) => Promise<{ crewId: number }>;
  handleFIleSubmit: (payload: FileMutationRequest) => Promise<void>;
  submitType: '수정' | '생성';
}

function CrewForm({ initialData, handleJSONSubmit, handleFIleSubmit, submitType }: CrewFormProps) {
  const { formMethods, handleFileInputClick, mergedRef } = useCrewRegister(initialData);
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    control,
  } = formMethods;

  const watchedFile = useWatch({ control, name: 'image' });
  const crewImagePreview = useBlobURL(watchedFile?.[0]);

  const handleSubmit = async (data: CrewFormType) => {
    const { title, introduce, image } = data;
    const files = image ? [...image] : [];

    const { crewId } = await handleJSONSubmit({ name: title, introduce: introduce });
    await handleFIleSubmit({ id: crewId, files: files });

    navigate(routePaths.home.getPath(crewId));
  };

  return (
    <TitledFormLayout handleSubmit={formMethods.handleSubmit(handleSubmit)}>
      <TitledFormLayout.Title>크루 {submitType} 페이지</TitledFormLayout.Title>
      <TitledFormLayout.Form>
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
      </TitledFormLayout.Form>
      <TitledFormLayout.Button>{submitType}하기</TitledFormLayout.Button>
    </TitledFormLayout>
  );
}

export default CrewForm;
