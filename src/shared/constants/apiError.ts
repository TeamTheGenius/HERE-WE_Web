export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNSUPPORTED_MEDIA_TYPE: 415,

  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

interface ApiError {
  message: string;
  statusCode: HttpStatusCode;
}

type ApiErrorMap = {
  [key: string]: ApiError;
};

export const API_ERRORS: ApiErrorMap = {
  CONCURRENT_MODIFICATION_EXCEPTION: {
    message: '다른 사용자가 수정중입니다. 다시 시도해 주세요.',
    statusCode: HTTP_STATUS.CONFLICT,
  },
  REQUIRED_FIELD_MISSING: {
    message: '필수 항목이 누락되었습니다. 입력 내용을 다시 확인해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  ALREADY_REGISTERED: {
    message: '이미 가입됐습니다. 로그인해 주세요.',
    statusCode: HTTP_STATUS.CONFLICT,
  },
  MEMBER_NOT_FOUND: {
    message: '해당 사용자를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },
  NICKNAME_DUPLICATED: {
    message: '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해 주세요.',
    statusCode: HTTP_STATUS.CONFLICT,
  },
  INVALID_NICKNAME: {
    message: '닉네임은 한글, 영문, 숫자만 사용할 수 있으며 2자 이상 20자 이하로 입력해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  CREW_NOT_FOUND: {
    message: '해당 크루를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },

  LEADER_CANNOT_EXPEL: {
    message: '크루 리더는 탈퇴할 수 없습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },

  LEADER_PERMISSION_DENIED: {
    message: '해당 작업은 크루 리더만 수행할 수 있습니다.',
    statusCode: HTTP_STATUS.FORBIDDEN,
  },
  CREW_JOIN_INFO_NOT_FOUND: {
    message: '해당 크루에 대한 참여 정보가 없습니다.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },

  ALREADY_JOINED_CREW: {
    message: '이미 이 크루에 참여 중입니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  CREW_MEMBERSHIP_REQUIRED: {
    message: '크루 멤버에게만 허용된 작업입니다. 크루에 참여한 후 이용해 주세요.',
    statusCode: HTTP_STATUS.FORBIDDEN,
  },
  INVALID_CREW_CAPACITY: {
    message: '크루는 최대 500명까지 참여할 수 있습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },

  INVITATION_NOT_FOUND: {
    message: '초대 정보를 찾을 수 없습니다. 다시 확인해 주세요.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },
  INVITATION_EXPIRED: {
    message: '초대가 만료되었습니다. 새 초대를 받아 다시 시도해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },

  MOMENT_NOT_FOUND: {
    message: '해당 모먼트를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },
  INVALID_MOMENT_CAPACITY: {
    message: '모먼트의 참여 인원은 2명 이상, 500명 이하로 설정해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  INVALID_MOMENT_DATE: {
    message: '만남일자와 마감일은 오늘 이후여야 하며, 만남일자는 마감일보다 더 늦어야 합니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  ALREADY_JOINED_MOMENT: {
    message: '이미 이 모먼트에 참여 중입니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  MOMENT_DEADLINE_EXPIRED: {
    message: '참여 마감일이 지났습니다. 마감일 이전까지만 참여하거나 취소할 수 있습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  MOMENT_CAPACITY_FULL: {
    message: '모먼트의 참여 인원이 모두 찼습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },
  MOMENT_PARTICIPATION_NOT_FOUND: {
    message: '참여 정보가 없습니다. 모먼트에 참여한 사용자만 이용할 수 있습니다.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },

  LOCATION_LIMIT_EXCEEDED: {
    message: '장소는 최대 100개까지 등록할 수 있습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
  },

  JWT_NOT_VALID: {
    message: 'JWT가 유효하지 않습니다.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
  },
  JWT_NOT_FOUND_IN_HEADER: {
    message: 'Header에서 JWT를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
  },
  JWT_NOT_FOUND_IN_COOKIE: {
    message: 'Cookie에서 JWT를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
  },
  TOKEN_HIJACKED: {
    message: '토큰 탈취가 감지되었습니다. 다시 로그인해주세요.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
  },

  REGISTRATION_TOKEN_NOT_FOUND: {
    message: '회원가입 토큰을 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.NOT_FOUND,
  },

  NOT_SUPPORTED_EXTENSION: {
    message: '지원하지 않는 파일 형식입니다.',
    statusCode: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE,
  },
} as const;
