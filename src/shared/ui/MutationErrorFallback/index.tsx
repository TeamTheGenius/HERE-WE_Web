import { isModalError, isToastError } from '@/shared/api/error.type';
import { API_ERRORS } from '@/shared/api/errorMap.type';
import { useAddToast } from '@/shared/hooks/useToast';
import { isAxiosError } from 'axios';
import { PropsWithChildren, useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Modal } from '../Modal';
import { useNavigate } from 'react-router-dom';
import { HTTP_STATUS } from '@/shared/api/status.type';
import { routePaths } from '@/app/routes/path';
import { useHandleModalError } from '@/shared/api/error.modalHandler';

interface MutationErrorFallbackProps extends FallbackProps, PropsWithChildren {}

export function MutationErrorFallback({ error, resetErrorBoundary, children }: MutationErrorFallbackProps) {
  const isMutationRequest =
    isAxiosError(error) && ['post', 'put', 'patch', 'delete'].includes(error.config?.method?.toLowerCase() || '');
  if (!isMutationRequest || !error?.response) throw error;

  const errorInfo = API_ERRORS[error.response.data.code];

  const addToast = useAddToast();
  const navigate = useNavigate();
  const modalHandler = useHandleModalError(resetErrorBoundary, errorInfo);

  useEffect(() => {
    // 인증 관련 에러 시 로그인 페이지로 리다이렉트
    if (error?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      resetErrorBoundary();
      navigate(routePaths.signIn);
    }
  }, [error, navigate, resetErrorBoundary]);

  useEffect(() => {
    // 토스트로 처리(추후 액션 버튼 있을 시 모달처럼 내부 handler 필요)
    if (isToastError(errorInfo)) {
      addToast({ type: 'error', message: errorInfo.message });
      resetErrorBoundary();
    }
  }, [addToast, resetErrorBoundary, errorInfo]);

  useEffect(() => {
    // 모달로 처리
    if (isModalError(errorInfo) && modalHandler) {
      modalHandler.openModal();
    }
  }, [errorInfo, modalHandler]);

  if (isModalError(errorInfo) && modalHandler) {
    const { isOpen, handleClose, handleAction } = modalHandler;
    return (
      <>
        {children}
        <Modal isOpen={isOpen}>
          <Modal.Overlay handleClick={handleClose} />
          <Modal.Title>{errorInfo.title}</Modal.Title>
          <Modal.Description>{errorInfo.message}</Modal.Description>
          <Modal.LeftButton onClick={handleClose}>닫기</Modal.LeftButton>
          <Modal.RightButton onClick={handleAction}>{errorInfo.label}</Modal.RightButton>
        </Modal>
      </>
    );
  }

  return <>{children}</>;
}
