import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '.';

const meta: Meta<typeof Skeleton> = {
  title: 'shared/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: `로딩 상태를 나타내는 스켈레톤 컴포넌트입니다. 다양한 형태와 애니메이션을 지원합니다.`,
      },
    },
  },
  args: {
    // 기본값 설정
    variant: 'rounded',
    width: '60px',
    height: '60px',
    animation: 'wave',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['rounded', 'circle', 'rect'],
      description: '스켈레톤 형태',
      table: {
        type: { summary: 'rounded | circle | rect' },
        defaultValue: { summary: 'rounded' },
      },
    },
    width: {
      control: 'text',
      description: '너비 (문자열)',
      table: {
        type: { summary: 'string' },
      },
    },
    height: {
      control: 'text',
      description: '높이 (문자열)',
      table: {
        type: { summary: 'string' },
      },
    },
    animation: {
      control: 'inline-radio',
      options: ['wave', 'pulse', 'none'],
      description: '애니메이션 타입',
      table: {
        type: { summary: 'wave | pulse | none' },
        defaultValue: { summary: 'wave' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '60px',
    height: '60px',
    animation: 'pulse',
  },
};

export const Rect: Story = {
  args: {
    variant: 'rect',
    width: '300px',
    height: '60px',
    animation: 'pulse',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '300px',
    height: '60px',
    animation: 'pulse',
  },
};

export const WaveAnimation: Story = {
  args: {
    variant: 'rect',
    width: '210px',
    height: '118px',
    animation: 'wave',
  },
};

export const PulseAnimation: Story = {
  args: {
    variant: 'rect',
    width: '210px',
    height: '118px',
    animation: 'pulse',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'rect',
    width: '210px',
    height: '118px',
    animation: 'none',
  },
};
