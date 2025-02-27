import type { Meta, StoryObj } from '@storybook/react';
import Badge from '.';

const meta: Meta<typeof Badge> = {
  title: 'shared/Badge',
  component: Badge,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Badge 컴포넌트는 태그 스타일의 UI 요소로, 텍스트 및 아이콘을 표시할 수 있습니다.',
      },
    },
  },

  argTypes: {
    variant: {
      control: 'radio',
      description: 'Badge의 스타일 변형',
    },
    text: {
      control: 'text',
      description: 'Badge 내부에 표시될 텍스트',
    },
    icon: {
      control: 'select',
      description: 'Badge에 표시할 아이콘',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    text: 'Primary Badge',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Badge',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    text: 'Tertiary Badge',
    variant: 'tertiary',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Badge with Icon',
    variant: 'primary',
    icon: 'alarm',
  },
};
