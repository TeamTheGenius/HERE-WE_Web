import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './index';

const meta: Meta<typeof Toast> = {
  title: 'shared/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
  Toast는 사용자에게 피드백이나 알림을 제공하는 메시지 컴포넌트입니다.
  'success', 'error', 'warning', 'action' 네 가지 타입을 지원하며 각각 다른 스타일과 아이콘을 제공합니다.
  컴포넌트 합성(Compound Component) 패턴을 사용하여 유연한 레이아웃과 커스터마이징을 지원합니다.
  
  ## 서브 컴포넌트
  - **Toast.Header**: 토스트 메시지의 헤더를 구성하는 컴포넌트입니다. 주로 메시지의 유형에 따른 스타일링과 아이콘을 포함합니다.
  - **Toast.Bar**: 메시지의 상태를 나타내는 색상 바를 제공합니다. 메시지 유형에 따라 색상이 다릅니다.
  - **Toast.Icon**: 토스트의 상태에 맞는 아이콘을 표시합니다. 각 상태에 따라 다른 아이콘이 표시됩니다.
  - **Toast.Body**: 실제 메시지 본문을 포함하는 영역입니다.
  - **Toast.Title**: 토스트 메시지의 제목을 나타냅니다.
  - **Toast.Message**: 메시지의 본문 내용을 제공합니다.
  - **Toast.Footer**: 토스트의 하단 영역으로, 액션 버튼 또는 삭제 버튼 등을 포함할 수 있습니다.
  - **Toast.RemoveButton**: 토스트 메시지를 삭제할 수 있는 버튼입니다.
  - **Toast.ActionButton**: 사용자에게 특정 작업을 유도하는 버튼을 제공합니다.
          `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '토스트 컴포넌트의 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {},
  render: () => {
    return (
      <Toast>
        <Toast.Header>
          <Toast.Bar type="success" />
          <Toast.Icon type="success" />
        </Toast.Header>
        <Toast.Body>
          <Toast.Title>성공</Toast.Title>
          <Toast.Message>작업이 성공적으로 완료되었습니다.</Toast.Message>
        </Toast.Body>
        <Toast.Footer>
          <Toast.RemoveButton handleRemove={() => alert('삭제 trigger')} />
        </Toast.Footer>
      </Toast>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '성공 메시지를 나타내는 토스트 컴포넌트입니다. 녹색 막대와 성공 아이콘을 표시합니다.',
      },
    },
  },
};

export const Error: Story = {
  args: {},
  render: () => (
    <Toast>
      <Toast.Header>
        <Toast.Bar type="error" />
        <Toast.Icon type="error" />
      </Toast.Header>
      <Toast.Body>
        <Toast.Title>에러</Toast.Title>
        <Toast.Message>작업 처리 중 오류가 발생했습니다.</Toast.Message>
      </Toast.Body>
      <Toast.Footer>
        <Toast.RemoveButton handleRemove={() => alert('삭제 trigger')} />
      </Toast.Footer>
    </Toast>
  ),
  parameters: {
    docs: {
      description: {
        story: '오류 메시지를 나타내는 토스트 컴포넌트입니다. 빨간색 막대와 오류 아이콘을 표시합니다.',
      },
    },
  },
};

export const Warning: Story = {
  args: {},
  render: () => (
    <Toast>
      <Toast.Header>
        <Toast.Bar type="warning" />
        <Toast.Icon type="warning" />
      </Toast.Header>
      <Toast.Body>
        <Toast.Title>경고</Toast.Title>
        <Toast.Message>이 작업은 되돌릴 수 없습니다.</Toast.Message>
      </Toast.Body>
      <Toast.Footer>
        <Toast.RemoveButton handleRemove={() => alert('삭제 trigger')} />
      </Toast.Footer>
    </Toast>
  ),
  parameters: {
    docs: {
      description: {
        story: '경고 메시지를 나타내는 토스트 컴포넌트입니다. 노란색 막대와 경고 아이콘을 표시합니다.',
      },
    },
  },
};

export const Action: Story = {
  args: {},
  render: () => (
    <Toast>
      <Toast.Header>
        <Toast.Bar type="action" />
      </Toast.Header>
      <Toast.Body>
        <Toast.Message>계정 업데이트가 필요합니다.</Toast.Message>
      </Toast.Body>
      <Toast.Footer>
        <Toast.ActionButton handleAction={() => alert('action trigger')}>업데이트하기</Toast.ActionButton>
      </Toast.Footer>
    </Toast>
  ),
  parameters: {
    docs: {
      description: {
        story: '사용자 액션이 필요한 메시지를 나타내는 토스트 컴포넌트입니다. 파란색 막대와 액션 버튼을 표시합니다.',
      },
    },
  },
};
