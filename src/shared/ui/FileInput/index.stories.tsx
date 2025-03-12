import { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '.';
import temp from '@/shared/assets/temp.jpg';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import { useWatch } from 'react-hook-form';
import { useBlobURL } from '@/shared/hooks/useBlobURL';

const meta: Meta<typeof FileInput> = {
  title: 'shared/FileInput',
  component: FileInput,
  parameters: {
    componentSubtitle: '이미지 업로드 공통 컴포넌트입니다.',

    docs: {
      description: {
        component: `
- <FileInput.Label>: 파일 업로드를 위한 label 컴포넌트로, 클릭 시 파일 선택 다이얼로그가 열립니다.
- <FileInput.Input>: 실제 파일을 선택하는 input 컴포넌트입니다. 사용자가 선택한 파일을 처리합니다.
- <FileInput.Title>: 파일 입력 필드의 제목을 설정하는 컴포넌트입니다. 필수 항목 표시 및 제목 텍스트를 관리할 수 있습니다.
- <FileInput.Message>: 파일 업로드 상태에 따른 메시지를 표시하는 컴포넌트로, 에러나 성공 메시지를 사용자에게 전달합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {},
  render: () => (
    <FileInput>
      <FileInput.Title>Upload your image</FileInput.Title>
      <FileInput.Label handleClick={() => {}} imagePreview={undefined} />
      <FileInput.Input placeholder="" hasError={false} />
    </FileInput>
  ),
};

export const WithError: Story = {
  args: {},
  render: () => (
    <FileInput>
      <FileInput.Title>Upload your image</FileInput.Title>
      <FileInput.Label handleClick={() => {}} imagePreview={undefined} />
      <FileInput.Input placeholder="" hasError={true} />
      <FileInput.Message variant="warning">Please upload a valid image file.</FileInput.Message>
    </FileInput>
  ),
};

export const WithPreview: Story = {
  args: {},
  render: () => (
    <FileInput>
      <FileInput.Title>Upload your profile picture</FileInput.Title>
      <FileInput.Label handleClick={() => {}} imagePreview={temp} />
      <FileInput.Input placeholder="" hasError={false} />
      <FileInput.Message variant="information">No image selected yet.</FileInput.Message>
    </FileInput>
  ),
};

export const Playground: Story = {
  args: {},
  render: () => {
    const { formMethods, handleFileInputClick, mergedRef } = useCrewRegister({
      image: undefined,
      title: '',
      introduce: '',
    });
    const {
      formState: { errors },
      register,
      control,
    } = formMethods;

    const watchedFile = useWatch({ control, name: 'image' });
    const crewImagePreview = useBlobURL(watchedFile?.[0]);

    return (
      <FileInput>
        <FileInput.Title isRequired={true}>썸네일</FileInput.Title>
        <FileInput.Input {...register('image')} ref={mergedRef} />
        <FileInput.Label handleClick={handleFileInputClick} imagePreview={crewImagePreview} />
        {errors.image && <FileInput.Message variant="warning">{errors.image.message}</FileInput.Message>}
      </FileInput>
    );
  },
};
