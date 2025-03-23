import type { Meta, StoryObj } from '@storybook/react';
import Overlay from './';

const meta = {
  title: 'shared/Overlay',
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '모달 뒤에 표시되는 반투명 오버레이 컴포넌트입니다.',
    docs: {
      description: {
        component: `
오버레이는 모달이나 팝업 등이 표시될 때 배경을 어둡게 처리하여 주요 콘텐츠에 집중할 수 있도록 도와주는 컴포넌트입니다.
주로 모달 컴포넌트와 함께 사용되며, 클릭 시 모달을 닫는 기능을 제공합니다.

### 주요 특징

- 전체 화면을 덮는 어두운 배경을 제공
- 클릭 이벤트를 처리하여 모달을 닫는 기능 지원
- z-index를 통해 적절한 레이어 위치 조정
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    handleClick: {
      description: '오버레이 클릭 시 호출될 함수',
      action: 'clicked',
      control: false,
    },
  },
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleClick: () => alert('오버레이 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 오버레이 컴포넌트입니다. 화면 전체를 덮는 반투명한 레이어를 생성합니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '300px' }}>
      <div style={{ padding: '20px' }}>
        <h2>배경 콘텐츠</h2>
        <p>이 콘텐츠는 오버레이 뒤에 있습니다.</p>
      </div>
      <Overlay {...args} />
    </div>
  ),
};

export const WithContent: Story = {
  args: {
    handleClick: () => alert('오버레이 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '오버레이 위에 콘텐츠가 있는 예시입니다. 실제 모달과 함께 사용되는 방식을 보여줍니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '300px' }}>
      <div style={{ padding: '20px' }}>
        <h2>배경 콘텐츠</h2>
        <p>이 콘텐츠는 오버레이 뒤에 있습니다.</p>
      </div>
      <Overlay {...args} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3>모달 콘텐츠</h3>
        <p>이 콘텐츠는 오버레이 위에 표시됩니다.</p>
      </div>
    </div>
  ),
};
