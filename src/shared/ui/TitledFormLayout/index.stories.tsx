import { Meta, StoryObj } from '@storybook/react';
import { FormEvent } from 'react';
import { TitledFormLayout } from '.';
import { useCrewRegister } from '@/features/crew/model/useCrewRegister';
import CrewForm from '@/features/crew/ui/CrewForm';

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
    <TitledFormLayout
      handleSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <TitledFormLayout.Title>Form Title</TitledFormLayout.Title>
      <TitledFormLayout.Form>
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
    const { formMethods, handleFileInputClick, mergedRef } = useCrewRegister({
      image: undefined,
      title: '',
      introduce: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formMethods.trigger();
    };
    return (
      <TitledFormLayout handleSubmit={handleSubmit}>
        <TitledFormLayout.Title>크루 생성 페이지</TitledFormLayout.Title>
        <TitledFormLayout.Form>
          <CrewForm formMethods={formMethods} handleFileInputClick={handleFileInputClick} mergedRef={mergedRef} />
        </TitledFormLayout.Form>
        <TitledFormLayout.Button>생성하기</TitledFormLayout.Button>
      </TitledFormLayout>
    );
  },
};
