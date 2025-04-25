import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `기본적으로 primary 및 secondary 스타일을 지원하며, 크기와 아이콘을 설정할 수 있습니다.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      description: '버튼 스타일',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'inline-radio',
      description: '버튼 크기',
      table: {
        type: { summary: 'large | medium | small' },
        defaultValue: { summary: 'medium' },
      },
    },
    text: {
      control: 'text',
      description: '버튼 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'inline-radio',
      description: '버튼 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    iconColor: {
      control: 'inline-radio',
      description: '버튼 아이콘 색상',
      table: {
        type: { summary: 'TextColorType' },
        defaultValue: { summary: '"text-white" (primary) | "text-secondary" (secondary)' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    text: 'Secondary Button',
  },
};
