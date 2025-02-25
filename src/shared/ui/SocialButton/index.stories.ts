import type { Meta, StoryObj } from '@storybook/react';
import SocialButton from '.';

const meta: Meta<typeof SocialButton> = {
  title: 'shared/SocialButton',
  component: SocialButton,
  argTypes: {
    variant: {
      control: 'inline-radio',
      description: '버튼의 소셜 플랫폼 종류',
      table: {
        type: { summary: "'google' | 'naver' | 'kakao'" },
      },
    },
    text: {
      control: 'text',
      description: '버튼 텍스트',
      table: {
        type: { summary: 'string' },
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
  parameters: {
    docs: {
      description: {
        component: 'Google, Naver, Kakao 소셜 로그인 버튼을 위한 컴포넌트.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SocialButton>;

export const Google: Story = {
  args: {
    variant: 'google',
    text: 'Sign in with Google',
  },
};

export const Naver: Story = {
  args: {
    variant: 'naver',
    text: '네이버 로그인',
  },
};

export const Kakao: Story = {
  args: {
    variant: 'kakao',
    text: '카카오 로그인',
  },
};
