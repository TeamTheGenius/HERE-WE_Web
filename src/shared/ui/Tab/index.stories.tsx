import { Tab } from './';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'shared/Tab',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component: `**Tab** UI 컴포넌트는 탭 간의 전환을 관리하는 UI를 제공합니다. 
  \`TabTrigger\`와 \`TabPanel\`을 사용하여 다양한 콘텐츠를 탭 내에서 전환할 수 있습니다.
  
  - **TabTrigger**는 클릭 가능한 탭 버튼을 생성합니다.
  - **TabPanel**은 해당 탭이 활성화되었을 때 콘텐츠를 렌더링합니다.
  
  \`Tab\` 컴포넌트는 내부적으로 \`TabContext\`를 사용하여 탭 간 전환 상태를 관리합니다. 
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: () => (
    <Tab initialIndex={0}>
      <Tab.TriggerList>
        <Tab.Trigger index={0}>방문 장소</Tab.Trigger>
        <Tab.Trigger index={1}>검색</Tab.Trigger>
      </Tab.TriggerList>
      <Tab.Panel index={0}>
        <div>방문 장소 컨텐츠</div>
      </Tab.Panel>
      <Tab.Panel index={1}>
        <div>검색 컨텐츠</div>
      </Tab.Panel>
    </Tab>
  ),
};
