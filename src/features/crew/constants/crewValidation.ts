export const REGEX = {
  title: /^(?!\s*$).{2,20}$/,
  introduce: /^(?!\s*$).{0,1000}$/,
};

export const VALIDATION_MESSAGES = {
  title: {
    required: '크루명을 입력해주세요',
    invalid: '제목은 2-20자로 입력해주세요',
  },
  introduce: {
    invalid: '소개는 0~1000자로 입력해주세요',
  },
  image: {
    required: '썸네일을 업로드해주세요',
  },
};
