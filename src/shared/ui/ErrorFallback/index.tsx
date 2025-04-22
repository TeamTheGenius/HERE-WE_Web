import { routePaths } from '@/app/routes/path';
import { API_ERRORS } from '@/shared/api/errorMap.type';
import { HTTP_STATUS } from '@/shared/api/status.type';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div>404</div>
      <p>Not Found</p>
    </>
  );
}

function ServerError({ resetErrorBoundary }: Pick<FallbackProps, 'resetErrorBoundary'>) {
  return (
    <>
      <div>Server Error</div>
      <p>서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAxiosError(error)) {
      // 인증 관련 에러면 로그인 페이지로 리다이렉트
      if (error?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        resetErrorBoundary();
        navigate(routePaths.signIn);
      }
    }
  }, [error, navigate, resetErrorBoundary]);

  const isNotFoundError = isAxiosError(error) && error.response?.status === HTTP_STATUS.NOT_FOUND;

  // 정의되지 않은 에러는 5xx 에러로 간주
  const isServerError = isAxiosError(error) && !API_ERRORS[error?.response?.data?.code];

  return (
    <>
      {isNotFoundError ? <NotFound /> : null}
      {isServerError ? <ServerError resetErrorBoundary={resetErrorBoundary} /> : null}
    </>
  );
}

export default ErrorFallback;
