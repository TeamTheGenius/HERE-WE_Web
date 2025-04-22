import { routePaths } from '@/app/routes/path';
import { ERROR_CODES } from './error.constant';
import { ApiErrorMap } from './error.type';
import { HTTP_STATUS } from './status.type';

/**
 * API 에러 맵 정의
 */
export const API_ERRORS: ApiErrorMap = {
  // 일반 에러
  [ERROR_CODES.CONCURRENT_MODIFICATION_EXCEPTION]: {
    message: '다른 사용자가 수정중입니다. 다시 시도해 주세요.',
    statusCode: HTTP_STATUS.CONFLICT,
    uiType: 'toast',
  },
  [ERROR_CODES.REQUIRED_FIELD_MISSING]: {
    message: '필수 항목이 누락되었습니다. 입력 내용을 다시 확인해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
  [ERROR_CODES.NOT_SUPPORTED_EXTENSION]: {
    message: '지원하지 않는 파일 형식입니다.',
    statusCode: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE,
    uiType: 'form',
  },

  // 인증 관련 에러
  [ERROR_CODES.ALREADY_REGISTERED]: {
    message: '이미 가입됐습니다. 로그인해 주세요.',
    statusCode: HTTP_STATUS.CONFLICT,
    uiType: 'modal',
    title: '계정 확인',
    label: '로그인하기',
    actionType: 'NAVIGATE',
    actionParams: { path: routePaths.signIn },
  },
  [ERROR_CODES.JWT_NOT_VALID]: {
    message: 'JWT가 유효하지 않습니다.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    uiType: 'redirect',
    path: routePaths.signIn,
  },
  [ERROR_CODES.JWT_NOT_FOUND_IN_HEADER]: {
    message: 'Header에서 JWT를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    uiType: 'redirect',
    path: routePaths.signIn,
  },
  [ERROR_CODES.JWT_NOT_FOUND_IN_COOKIE]: {
    message: 'Cookie에서 JWT를 찾을 수 없습니다.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    uiType: 'redirect',
    path: routePaths.signIn,
  },
  [ERROR_CODES.TOKEN_HIJACKED]: {
    message: '토큰 탈취가 감지되었습니다. 다시 로그인해주세요.',
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    uiType: 'redirect',
    path: routePaths.signIn,
  },
  [ERROR_CODES.REGISTRATION_TOKEN_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },

  // 사용자 관련 에러
  [ERROR_CODES.MEMBER_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },
  [ERROR_CODES.NICKNAME_DUPLICATED]: {
    message: '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해 주세요.',
    statusCode: HTTP_STATUS.CONFLICT,
    uiType: 'form',
  },
  [ERROR_CODES.INVALID_NICKNAME]: {
    message: '닉네임은 한글, 영문, 숫자만 사용할 수 있으며 2자 이상 20자 이하로 입력해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'form',
  },

  // 크루 관련 에러
  [ERROR_CODES.CREW_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },
  [ERROR_CODES.LEADER_CANNOT_EXPEL]: {
    message: '크루 리더는 탈퇴할 수 없습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
  [ERROR_CODES.LEADER_PERMISSION_DENIED]: {
    message: '해당 작업은 크루 리더만 수행할 수 있습니다.',
    statusCode: HTTP_STATUS.FORBIDDEN,
    uiType: 'toast',
  },
  [ERROR_CODES.CREW_JOIN_INFO_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },
  [ERROR_CODES.ALREADY_JOINED_CREW]: {
    message: '이미 이 크루에 참여 중입니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
  [ERROR_CODES.CREW_MEMBERSHIP_REQUIRED]: {
    message: '크루 멤버에게만 허용된 작업입니다. 크루에 참여한 후 이용해 주세요.',
    statusCode: HTTP_STATUS.FORBIDDEN,
    uiType: 'modal',
    title: '크루 멤버십 필요',
    label: '크루 참여하기',
    actionType: 'JOIN_CREW',
  },
  [ERROR_CODES.INVALID_CREW_CAPACITY]: {
    message: '크루는 최대 500명까지 참여할 수 있습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'form',
  },

  // 초대 관련 에러
  [ERROR_CODES.INVITATION_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },
  [ERROR_CODES.INVITATION_EXPIRED]: {
    message: '초대 링크가 만료되었습니다. 초대자에게 새 초대 링크를 요청하세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'ui',
  },

  // 모먼트 관련 에러
  [ERROR_CODES.MOMENT_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },
  [ERROR_CODES.INVALID_MOMENT_CAPACITY]: {
    message: '모먼트의 참여 인원은 2명 이상, 500명 이하로 설정해 주세요.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'form',
  },
  [ERROR_CODES.INVALID_MOMENT_DATE]: {
    message: '만남일자와 마감일은 오늘 이후여야 하며, 만남일자는 마감일보다 더 늦어야 합니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'form',
  },
  [ERROR_CODES.ALREADY_JOINED_MOMENT]: {
    message: '이미 이 모먼트에 참여 중입니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
  [ERROR_CODES.MOMENT_DEADLINE_EXPIRED]: {
    message: '참여 마감일이 지났습니다. 마감일 이전까지만 참여하거나 취소할 수 있습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
  [ERROR_CODES.MOMENT_CAPACITY_FULL]: {
    message: '모먼트의 참여 인원이 모두 찼습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
  [ERROR_CODES.MOMENT_PARTICIPATION_NOT_FOUND]: {
    message: 'NOT FOUND',
    statusCode: HTTP_STATUS.NOT_FOUND,
    uiType: 'ui',
  },
  [ERROR_CODES.LOCATION_LIMIT_EXCEEDED]: {
    message: '장소는 최대 100개까지 등록할 수 있습니다.',
    statusCode: HTTP_STATUS.BAD_REQUEST,
    uiType: 'toast',
  },
} as const;

/**
 * API 에러 코드 타입
 */
export type ApiErrorCode = keyof typeof API_ERRORS;
