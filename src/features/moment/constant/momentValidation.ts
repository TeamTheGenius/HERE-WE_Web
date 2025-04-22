export const REGEX = {
  name: /^(?!\s*$).{2,20}$/,
  capacity: /^([2-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/, // 2~500
};

export const VALIDATION_MESSAGES = {
  name: {
    required: '모먼트 제목을 입력해주세요',
    invalid: '제목은 2-20자로 입력해주세요',
  },
  capacity: {
    required: '신청 마감 인원을 입력해주세요',
    invalid: '2~500명으로 입력해주세요',
  },
  image: {
    required: '썸네일을 업로드해주세요',
  },
  meetAt: {
    required: '만나는 날짜/시간을 선택해주세요',
    invalid: '현재 시각 이후로 설정해주세요',
  },
  closedAt: {
    required: '신청 마감 날짜/시간을 선택해주세요',
    invalid: '현재 시각 이후로 설정해주세요',
    invalidOrder: '마감 날짜/시각이 만나는 날짜/시각 이전이야해요',
  },
  place: {
    required: '만나는 위치를 선택해주세요',
  },
};
