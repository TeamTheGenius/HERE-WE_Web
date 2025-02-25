import type { Meta, StoryObj } from '@storybook/react';
import Logo from '.';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    haveIntroduce: {
      control: 'boolean',
      description: '서비스 소개 문구 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'inline-radio',
      description: '로고 크기',
      table: {
        type: { summary: "'lg' | 'md'" },
        defaultValue: { summary: "'lg'" },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    haveIntroduce: false,
    size: 'md',
  },
};
