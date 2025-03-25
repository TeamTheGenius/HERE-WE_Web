import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '.';
import { useForm } from 'react-hook-form';
import { REGEX, VALIDATION_MESSAGES } from '@/shared/constants/userValidation';

const meta: Meta<typeof TextInput> = {
  title: 'shared/TextInput',
  component: TextInput,

  parameters: {
    componentSubtitle: '사용자 입력을 위한 텍스트 입력 필드입니다.',
    docs: {
      description: {
        component: `
- <TextInput.Label>: input의 label, visible/required에 따른 UI를 설정하는 컴포넌트입니다. 
- <TextInput.Input>: input의 placeholder, hasError에 따른 UI를 설정하는 컴포넌트입니다. 
- <TextInput.Button>: 폼 제출 시 거쳐야하는 확인 과정이 있을 때 사용하는 컴포넌트입니다. ex. 닉네임 중복 확인 
- <TextInput.Message>: message와 success/error에 따른 UI를 설정하는 컴포넌트입니다. 
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 텍스트 입력 필드 예제입니다.',
      },
    },
  },
  render: () => (
    <TextInput>
      <TextInput.Label>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임을 입력해주세요" hasError={false} />
    </TextInput>
  ),
};

export const WithButton: Story = {
  parameters: {
    docs: {
      description: {
        story: '입력 필드와 함께 버튼을 포함한 예제입니다.',
      },
    },
  },
  render: () => (
    <TextInput>
      <TextInput.Label>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임을 입력해주세요" hasError={false} />
      <TextInput.Button onClick={() => alert('Searching...')}>중복 확인</TextInput.Button>
    </TextInput>
  ),
};

export const RequiredField: Story = {
  parameters: {
    docs: {
      description: {
        story: '필수로 입력해야하는 텍스트 입력 필드 예제입니다.',
      },
    },
  },
  render: () => (
    <TextInput>
      <TextInput.Label isRequired>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임을 입력해주세요" hasError={false} />
    </TextInput>
  ),
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: '에러 상태를 나타내며, 에러 메시지를 표시합니다.',
      },
    },
  },
  render: () => (
    <TextInput>
      <TextInput.Label>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임을 입력해주세요" hasError={true} />
      <TextInput.Message variant="warning">필수 항목입니다.</TextInput.Message>
    </TextInput>
  ),
};

export const SuccessState: Story = {
  parameters: {
    docs: {
      description: {
        story: '성공 상태를 나타내며, 성공 메시지를 표시합니다.',
      },
    },
  },
  render: () => (
    <TextInput>
      <TextInput.Label>닉네임</TextInput.Label>
      <TextInput.Input placeholder="닉네임을 입력해주세요" hasError={false} />
      <TextInput.Message variant="success">사용 가능한 ID 입니다.</TextInput.Message>
    </TextInput>
  ),
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: '스토리북 컨트롤을 이용하여 동적으로 속성을 변경할 수 있는 예제입니다.',
      },
    },
  },

  render: () => {
    const {
      register,
      formState: { errors },
    } = useForm({
      defaultValues: {
        nickname: 'seona',
      },
      mode: 'onChange',
    });

    register('nickname', {
      pattern: {
        value: REGEX.nickname,
        message: VALIDATION_MESSAGES.nickname.invalid,
      },
      required: VALIDATION_MESSAGES.nickname.required,
    });

    return (
      <TextInput>
        <TextInput.Label isRequired={true}>닉네임</TextInput.Label>
        <TextInput.Input
          minLength={2}
          maxLength={20}
          placeholder="2-20자의 한글, 영문, 숫자로 입력해주세요"
          {...register('nickname')}
          onInvalid={(e) => e.preventDefault()}
          hasError={!!errors.nickname}
        />
        {errors.nickname ? (
          <TextInput.Message variant="warning">{errors.nickname.message}</TextInput.Message>
        ) : (
          <TextInput.Message variant="success">사용 가능한 닉네임입니다.</TextInput.Message>
        )}
      </TextInput>
    );
  },
};
