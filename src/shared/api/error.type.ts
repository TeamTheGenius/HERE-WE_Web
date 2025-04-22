// types.ts

import { HttpStatusCode } from './status.type';

/**
 * API 에러에 사용될 UI 표시 타입
 */
export type ApiErrorUIType = 'toast' | 'form' | 'modal' | 'ui' | 'redirect';

/**
 * 모달 버튼 클릭 시 실행할 액션 타입
 */
export type ActionType = 'NAVIGATE' | 'JOIN_CREW' | 'LOGIN' | 'RETRY_REQUEST' | 'JOIN_MOMENT' | 'CLOSE_MODAL';

/**
 * 기본 API 에러 인터페이스
 */
export interface BaseApiError {
  message: string;
  statusCode: HttpStatusCode;
  uiType: ApiErrorUIType;
}

/**
 * 토스트 메시지로 표시할 에러
 */
export interface ToastUI extends BaseApiError {
  uiType: 'toast';
  title?: string;
}

/**
 * 폼 필드 인라인으로 표시할 에러
 */
export interface FormUI extends BaseApiError {
  uiType: 'form';
}

/**
 * 모달로 표시할 에러
 */
export interface ModalUI extends BaseApiError {
  uiType: 'modal';
  title: string;
  label: string;
  actionType: ActionType;
  actionParams?: Record<string, any>;
}

/**
 * 페이지 UI에 직접 표시할 에러
 */
export interface UiPageUI extends BaseApiError {
  uiType: 'ui';
}

/**
 * 다른 페이지로 리다이렉트할 에러
 */
export interface RedirectUI extends BaseApiError {
  uiType: 'redirect';
  path: string;
}

/**
 * 모든 API 에러 타입
 */
export type ApiError = ToastUI | FormUI | ModalUI | UiPageUI | RedirectUI;

/**
 * API 에러 맵 타입
 */
export type ApiErrorMap = {
  readonly [key: string]: ApiError;
};

/**
 * 타입 가드 함수들
 */
export const isToastError = (error: ApiError): error is ToastUI => error.uiType === 'toast';
export const isFormError = (error: ApiError): error is FormUI => error.uiType === 'form';
export const isModalError = (error: ApiError): error is ModalUI => error.uiType === 'modal';
export const isUiPageError = (error: ApiError): error is UiPageUI => error.uiType === 'ui';
export const isRedirectError = (error: ApiError): error is RedirectUI => error.uiType === 'redirect';
