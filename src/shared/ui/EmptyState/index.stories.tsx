import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './index';

/**
 * EmptyState 컴포넌트의 스토리북 설정
 *
 * EmptyState는 데이터가 없거나 검색 결과가 없을 때 사용자에게 정보와 가능한 다음 액션을 안내하는 컴포넌트입니다.
 * 빈 상태 UI를 일관되게 표현하기 위한 복합 컴포넌트 패턴을 사용합니다.
 */
const meta: Meta<typeof EmptyState> = {
  title: 'shared/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
EmptyState는 데이터가 없거나 검색 결과가 없을 때 사용자에게 정보와 가능한 다음 액션을 안내하는 컴포넌트입니다.

## 주요 기능
- 다양한 empty state 상황을 일관된 UI로 표현
- 아이콘, 설명 텍스트, 액션 버튼을 포함할 수 있음
- 복합 컴포넌트 패턴을 활용하여 직관적인 사용성 제공

EmptyState는 복합 컴포넌트 패턴을 사용합니다. 다음과 같은 서브컴포넌트를 제공합니다:

- \`EmptyState.Icon\`: 상황에 맞는 아이콘을 표시합니다. color는 자동으로 'text-tertiary'로 설정됩니다.
- \`EmptyState.Description\`: 설명 텍스트를 표시합니다. 여러 개 사용할 수 있습니다.
- \`EmptyState.Action\`: 사용자가 취할 수 있는 액션을 위한 버튼을 제공합니다.
`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/**
 * 기본적인 EmptyState 컴포넌트의 예시입니다.
 * 아이콘과 설명 텍스트만 포함한 가장 기본적인 형태를 보여줍니다.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <EmptyState.Icon icon="people" iconSize="80" />
        <EmptyState.Description>표시할 데이터가 없습니다</EmptyState.Description>
      </>
    ),
  },
};

/**
 * 액션 버튼이 포함된 EmptyState입니다.
 * 사용자가 취할 수 있는 다음 액션을 제공하는 형태를 보여줍니다.
 */
export const WithAction: Story = {
  args: {
    children: (
      <>
        <EmptyState.Icon icon="people" iconSize="80" />
        <EmptyState.Description>크루의 모먼트가 없습니다</EmptyState.Description>
        <EmptyState.Description>새로운 모먼트를 생성해보세요</EmptyState.Description>
        <EmptyState.Action variant="primary">모먼트 생성하기</EmptyState.Action>
      </>
    ),
  },
};
