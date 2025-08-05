import { Meta, StoryObj } from '@storybook/react';
import { FormEvent } from 'react';
import { TitledFormLayout } from '.';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import { TextArea } from '../TextArea';
import { TextInput } from '../TextInput';

const meta: Meta<typeof TitledFormLayout> = {
  title: 'shared/TitledFormLayout',
  component: TitledFormLayout,
  parameters: {
    docs: {
      componentSubtitle: '제목과 제출 버튼이 있는 폼 레이아웃을 렌더링하는 컴포넌트입니다.',
      description: {
        component: `
- <TitledFormLayout.Title>: 폼의 제목을 설정하는 컴포넌트로, 폼을 설명하는 텍스트를 표시합니다. 
- <TitledFormLayout.Form>: 폼 내부에 들어가는 입력 요소들을 감싸는 컴포넌트입니다. 폼을 깔끔하게 그룹화하여 레이아웃을 구성합니다.
- <TitledFormLayout.Button>: 폼 제출을 위한 버튼으로, 사용자에게 제출을 유도하는 버튼을 제공합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TitledFormLayout>;

// 기본적인 예시
export const Default: Story = {
  args: {},
  render: () => (
    <TitledFormLayout>
      <TitledFormLayout.Title>Form Title</TitledFormLayout.Title>
      <TitledFormLayout.Form
        handleSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          alert('Form submitted!');
        }}
      >
        <input type="text" placeholder="Enter something..." />
        <input type="text" placeholder="Enter something..." />
        <input type="text" placeholder="Enter something..." />
      </TitledFormLayout.Form>
      <TitledFormLayout.Button>Submit</TitledFormLayout.Button>
    </TitledFormLayout>
  ),
};

export const Playground: Story = {
  args: {},
  render: () => {
    const { formMethods } = useCrewRegister({
      image: undefined,
      title: '',
      introduce: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formMethods.trigger();
    };
    return (
      <TitledFormLayout>
        <TitledFormLayout.Title>크루 생성 페이지</TitledFormLayout.Title>
        <TitledFormLayout.Form handleSubmit={handleSubmit}>
          <TextInput>
            <TextInput.Label isRequired={true}>크루명</TextInput.Label>
            <TextInput.Input
              minLength={2}
              maxLength={20}
              hasError={false}
              placeholder="크루명을 2자~20자 입력해주세요"
            />
          </TextInput>
          <TextArea>
            <TextArea.Label>소개</TextArea.Label>
            <TextArea.Area
              placeholder="크루를 0~1000자로 소개해주세요"
              hasError={false}
              minLength={0}
              maxLength={1000}
            />
          </TextArea>
        </TitledFormLayout.Form>
        <TitledFormLayout.Button>생성하기</TitledFormLayout.Button>
      </TitledFormLayout>
    );
  },
};
