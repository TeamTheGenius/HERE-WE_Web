import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '.';
import { usePagination } from '@/shared/hooks/usePagination';

const meta: Meta<typeof Pagination.Controller> = {
  title: 'shared/Pagination',
  component: Pagination.Controller,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '페이지네이션 컴포넌트입니다. \
        이전/다음 버튼, 블록 단위 네비게이션, 현재 페이지 하이라이팅을 지원합니다.',
      },
    },
  },
  argTypes: {
    blockSize: {
      control: 'number',
      description: '블록 사이즈 지정',
      defaultValue: 7,
    },
    nextBlockChar: {
      control: 'text',
      description: '다음 블록을 나타내는 문자',
      defaultValue: '...',
    },
    prevBlockChar: {
      control: 'text',
      description: '이전 블록을 나타내는 문자',
      defaultValue: '...',
    },
    nextPageChar: {
      control: 'text',
      description: '다음 페이지를 나타내는 문자',
      defaultValue: '>',
    },
    prevPageChar: {
      control: 'text',
      description: '이전 페이지를 나타내는 문자',
      defaultValue: '<',
    },
    paginationTools: {
      description: '`usePagination` 훅에서 반환된 객체',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination.Controller>;

// 기본 사용 예제
export const Default: Story = {
  args: {
    nextBlockChar: '...',
    prevBlockChar: '...',
    nextPageChar: '>',
    prevPageChar: '<',
    blockSize: 7,
  },
  render: (args) => {
    const paginationTools = usePagination(1, 22, args.blockSize); // blockSize 반영

    return <Pagination.Controller {...args} paginationTools={paginationTools} />;
  },
};

// 사용자 정의 문자 적용 예제
export const CustomLabels: Story = {
  args: {
    nextBlockChar: '>>',
    prevBlockChar: '<<',
    nextPageChar: '→',
    prevPageChar: '←',
    blockSize: 7,
  },
  render: (args) => {
    const paginationTools = usePagination(1, 25, args.blockSize);

    return <Pagination.Controller {...args} paginationTools={paginationTools} />;
  },
};
