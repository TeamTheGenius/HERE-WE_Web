import type { Meta, StoryObj } from '@storybook/react';
import ScrollableRow from '.';
import { CSSProperties } from 'react';

const meta: Meta<typeof ScrollableRow> = {
  title: 'shared/ScrollableRow',
  component: ScrollableRow,
  parameters: {
    componentSubtitle: '가로 스크롤이 가능한 행(Row) 레이아웃을 제공하는 컴포넌트입니다.',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollableRow>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 ScrollableRow 예제입니다. 내부 요소가 가로로 스크롤되도록 배치됩니다.',
      },
    },
  },
  render: () => (
    <ScrollableRow>
      <div style={boxStyle}>Item 1</div>
      <div style={boxStyle}>Item 2</div>
      <div style={boxStyle}>Item 3</div>
      <div style={boxStyle}>Item 4</div>
      <div style={boxStyle}>Item 5</div>
      <div style={boxStyle}>Item 6</div>
      <div style={boxStyle}>Item 7</div>
      <div style={boxStyle}>Item 8</div>
    </ScrollableRow>
  ),
};

const boxStyle: CSSProperties = {
  background: '#ddd',
  padding: '1rem',
  textAlign: 'center',
  borderRadius: '8px',
  minWidth: '100px',
};
