import type { Meta, StoryObj } from '@storybook/react';
import SocialIcon from '.';

const meta: Meta<typeof SocialIcon> = {
  title: 'Components/SocialIcon',
  component: SocialIcon,
  parameters: {
    docs: {
      description: {
        component: 'Google, Naver, Kakao 아이콘을 표시하는 컴포넌트.',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'inline-radio',
      description: '표시할 소셜 아이콘',
      table: {
        type: { summary: "'google' | 'naver' | 'kakao'" },
      },
    },
  },

  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SocialIcon>;

export const Google: Story = {
  args: {
    icon: 'google',
  },
};

export const Naver: Story = {
  args: {
    icon: 'naver',
  },
};

export const Kakao: Story = {
  args: {
    icon: 'kakao',
  },
};
