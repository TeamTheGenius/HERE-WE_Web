import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './';
import { useModal } from '@/shared/hooks/useModal';

const meta = {
  title: 'shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    componentSubtitle: '애플리케이션의 컨텐츠 위에 대화상자를 표시하는 모달 컴포넌트입니다.',

    docs: {
      description: {
        component: `
Modal은 주요 콘텐츠 앞에 표시되어 중요한 정보를 제공하거나 결정을 요청하는 대화상자 컴포넌트입니다.
이 컴포넌트는 유연하고 직관적인 API를 제공하기 위해 합성 컴포넌트 패턴을 사용합니다.

### 서브 컴포넌트

- <Modal.Overlay>: 모달 뒤에 표시되는 반투명 오버레이로, 클릭 시 모달을 닫을 수 있습니다.
- <Modal.Title>: 모달의 제목을 표시하는 컴포넌트입니다.
- <Modal.Description>: 모달의 부제목 또는 설명을 표시하는 컴포넌트입니다.
- <Modal.Content>: 모달의 주요 내용을 포함하는 컴포넌트입니다.
- <Modal.LeftButton>: 모달 하단 왼쪽에 위치하는 버튼(취소, 닫기 등)을 위한 컴포넌트입니다.
- <Modal.RightButton>: 모달 하단 오른쪽에 위치하는 버튼(확인, 제출 등)을 위한 컴포넌트입니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 표시 여부를 제어합니다',
    },
    children: {
      control: 'text',
      description: '모달 내용 컴포넌트',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: () => {
    const { isOpen, closeModal, openModal } = useModal();
    const confirmModal = () => {
      alert('확인!');
    };
    return (
      <>
        <button onClick={openModal}>모달 열기</button>
        <Modal isOpen={isOpen}>
          <Modal.Overlay handleClick={closeModal} />
          <Modal.Title>모달 예시</Modal.Title>
          <Modal.Description>모달 예시 설명</Modal.Description>
          <Modal.RightButton handleClick={closeModal}>닫기</Modal.RightButton>
          <Modal.RightButton handleClick={confirmModal}>확인</Modal.RightButton>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '제목, 설명, 및 버튼이 있는 기본 모달입니다.',
      },
    },
  },
};

export const WithContentModal: Story = {
  args: {
    isOpen: true,
  },
  render: () => {
    const { isOpen, closeModal, openModal } = useModal();
    return (
      <>
        <button onClick={openModal}>모달 열기</button>
        <Modal isOpen={isOpen}>
          <Modal.Overlay handleClick={closeModal} />
          <Modal.Title>모달 예시</Modal.Title>
          <Modal.Description>모달 예시 설명</Modal.Description>
          <Modal.Content>
            <p>모달 내용이 여기에 들어갑니다. 어떤 React 컴포넌트도 추가할 수 있습니다.</p>
          </Modal.Content>
          <Modal.RightButton handleClick={closeModal}>닫기</Modal.RightButton>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '제목, 설명, 내용, 버튼이 있는 모달입니다.',
      },
    },
  },
};
