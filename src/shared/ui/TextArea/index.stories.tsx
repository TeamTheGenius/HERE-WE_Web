import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';
import { useState } from 'react';

const meta: Meta<typeof TextArea> = {
  title: 'shared/TextArea',
  component: TextArea,
  parameters: {
    componentSubtitle: '사용자 입력을 위한 텍스트 영역 컴포넌트입니다.',
    docs: {
      description: {
        component: `
- <TextArea.Label>: 텍스트 영역의 label을 정의하는 컴포넌트입니다. isVisible과 isRequired를 통해 UI를 제어할 수 있습니다.
- <TextArea.Area>: 실제 텍스트 입력 영역을 구성하는 컴포넌트입니다. placeholder와 hasError에 따라 UI 스타일을 다르게 적용할 수 있습니다.
- <TextArea.Message>: 상태 메시지를 표시하는 컴포넌트로, variant에 따라 성공, 정보, 경고 메시지를 표시할 수 있습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 텍스트 영역 예제입니다.',
      },
    },
  },
  render: () => (
    <TextArea>
      <TextArea.Label>자기소개</TextArea.Label>
      <TextArea.Area placeholder="자기소개를 작성해주세요" hasError={false} />
    </TextArea>
  ),
};

export const WithMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: '텍스트 영역에 상태 메시지를 추가한 예제입니다.',
      },
    },
  },
  render: () => (
    <TextArea>
      <TextArea.Label>자기소개</TextArea.Label>
      <TextArea.Area placeholder="자기소개를 작성해주세요" hasError={false} />
      <TextArea.Message variant="information">이 필드는 선택 사항입니다.</TextArea.Message>
    </TextArea>
  ),
};

export const RequiredField: Story = {
  parameters: {
    docs: {
      description: {
        story: '필수 입력 필드로 설정한 텍스트 영역 예제입니다.',
      },
    },
  },
  render: () => (
    <TextArea>
      <TextArea.Label isRequired>자기소개</TextArea.Label>
      <TextArea.Area placeholder="자기소개를 작성해주세요" hasError={false} />
    </TextArea>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: '에러 상태를 나타내며, 에러 메시지를 표시하는 예제입니다.',
      },
    },
  },
  render: () => (
    <TextArea>
      <TextArea.Label isRequired={true}>자기소개</TextArea.Label>
      <TextArea.Area placeholder="자기소개를 작성해주세요" hasError={true} />
      <TextArea.Message variant="warning">이 필드는 필수 항목입니다.</TextArea.Message>
    </TextArea>
  ),
};

export const SuccessState: Story = {
  parameters: {
    docs: {
      description: {
        story: '성공 상태를 나타내며, 성공 메시지를 표시하는 예제입니다.',
      },
    },
  },
  render: () => (
    <TextArea>
      <TextArea.Label>자기소개</TextArea.Label>
      <TextArea.Area placeholder="자기소개를 작성해주세요" hasError={false} />
      <TextArea.Message variant="success">입력 완료되었습니다.</TextArea.Message>
    </TextArea>
  ),
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: '스토리북 컨트롤을 이용하여 동적으로 속성을 변경할 수 있는 예제입니다.',
      },
    },
  },

  render: () => {
    const [value, setValue] = useState('');

    return (
      <TextArea>
        <TextArea.Label>자기소개</TextArea.Label>
        <TextArea.Area
          hasError={false}
          placeholder="자기소개를 작성해주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={500}
        />
        <TextArea.Message variant="information">{`${value.length}/500`}</TextArea.Message>
      </TextArea>
    );
  },
};
