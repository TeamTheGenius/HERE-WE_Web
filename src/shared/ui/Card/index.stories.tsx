import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';
import testImage from '@/shared/assets/basic-profile-image-gray.png';

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card,
  parameters: {
    componentSubtitle: '카드 컴포넌트로 다양한 정보를 구성하는 UI 요소입니다.',
    docs: {
      description: {
        component: `
- <Card.Image>: 카드의 이미지를 구성하는 컴포넌트입니다.
- <Card.Title>: 카드의 제목을 구성하는 컴포넌트입니다.
- <Card.Detail>: 카드의 상세 정보를 구성하는 컴포넌트입니다.
- <Card.Metadata>: 카드의 메타 정보를 구성하는 컴포넌트입니다.
- <Card.Tag>: 카드에 태그를 추가할 수 있는 컴포넌트입니다.
        `,
      },
    },
  },

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 카드 구성 예제입니다.',
      },
    },
  },
  render: () => (
    <Card>
      <Card.Image src={testImage} alt="카드 이미지" />
      <Card.Title>카드 제목</Card.Title>
      <Card.Detail>카드 상세 설명 내용입니다.</Card.Detail>
      <Card.Metadata>메타 정보</Card.Metadata>
      <Card.Tag text="태그" />
    </Card>
  ),
};

export const WithTag: Story = {
  parameters: {
    docs: {
      description: {
        story: '카드에 태그를 추가한 예제입니다.',
      },
    },
  },
  render: () => (
    <Card>
      <Card.Image src={testImage} alt="카드 이미지" />
      <Card.Title>카드 제목</Card.Title>
      <Card.Detail>카드 상세 설명 내용입니다.</Card.Detail>
      <Card.Metadata>메타 정보</Card.Metadata>
      <Card.Tag text="태그" />
    </Card>
  ),
};

export const FullCard: Story = {
  parameters: {
    docs: {
      description: {
        story: '카드에 모든 컴포넌트를 추가한 예제입니다.',
      },
    },
  },
  render: () => (
    <Card>
      <Card.Image src={testImage} alt="카드 이미지" />
      <Card.Tag text="태그" />
      <Card.Title>카드 제목</Card.Title>
      <Card.Detail>카드 상세 설명 내용입니다.</Card.Detail>
      <Card.Metadata>메타 정보</Card.Metadata>
    </Card>
  ),
};

export const MinimalCard: Story = {
  parameters: {
    docs: {
      description: {
        story: '이미지와 제목만 있는 최소 카드 예제입니다.',
      },
    },
  },
  render: () => (
    <Card>
      <Card.Image src={testImage} alt="카드 이미지" />
      <Card.Title>카드 제목</Card.Title>
    </Card>
  ),
};
