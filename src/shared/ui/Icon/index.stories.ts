import type { Meta, StoryObj } from '@storybook/react';
import Icon from '.';

const meta: Meta<typeof Icon> = {
  title: 'shared/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `아이콘을 표시하는 컴포넌트입니다. <br/>  아이콘이 \`stroke\` 스타일이면 \`stroke\` 속성을, 그렇지 않으면 \`fill\` 속성을 적용합니다.`,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'inline-radio',
      description: '사용할 아이콘 타입',
      table: {
        type: { summary: 'IconType' },
      },
    },
    color: {
      control: 'inline-radio',
      description: '아이콘 색상',
      table: {
        type: { summary: 'TextColorType' },
      },
    },
    iconSize: {
      control: 'inline-radio',
      description: '아이콘 크기',
      table: {
        type: { summary: 'IconSizeType' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: 'calendar',
    color: 'text-primary',
    iconSize: '20',
  },
};
