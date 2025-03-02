import type { Meta, StoryObj } from '@storybook/react';
import GridContainer from '.';
import { CSSProperties } from 'react';

const meta: Meta<typeof GridContainer> = {
  title: 'shared/GridContainer',
  component: GridContainer,
  parameters: {
    componentSubtitle: '반응형 그리드 레이아웃을 제공하는 컨테이너 컴포넌트입니다.',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 그리드 컨테이너 예제입니다. 내부 요소를 자동으로 정렬합니다.',
      },
    },
  },
  render: () => (
    <GridContainer>
      <div style={boxStyle}>1</div>
      <div style={boxStyle}>2</div>
      <div style={boxStyle}>3</div>
      <div style={boxStyle}>4</div>
      <div style={boxStyle}>5</div>
      <div style={boxStyle}>6</div>
    </GridContainer>
  ),
};
const boxStyle: CSSProperties = {
  background: '#ddd',
  padding: '1rem',
  textAlign: 'center',
  borderRadius: '8px',
};
