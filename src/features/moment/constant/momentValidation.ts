export const REGEX = {
  title: /^(?!\s*$).{2,20}$/,
  participantCountLimit: /^([2-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)$/,
};

export const VALIDATION_MESSAGES = {
  title: {
    required: '모먼트 제목을 입력해주세요',
    invalid: '제목은 2-20자로 입력해주세요',
  },
  participantCountLimit: {
    required: '신청 마감 인원을 입력해주세요',
    invalid: '2~1000명으로 입력해주세요',
  },
  image: {
    required: '썸네일을 업로드해주세요',
  },
  deadlineDateTime: {
    required: '만나는 날짜/시간을 선택해주세요',
  },
  applicationDeadline: {
    required: '신청 마감 날짜/시간을 선택해주세요',
  },
  meetingLocation: {
    required: '만나는 위치를 선택해주세요',
  },
};
