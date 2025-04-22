import { routePaths } from '@/app/routes/path';
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

function QueryErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  // 읽기 전용 작업(GET, HEAD, OPTIONS)인지 확인
  const isReadOnlyRequest =
    isAxiosError(error) && ['get', 'head', 'options'].includes(error.config?.method?.toLowerCase() || '');

  // 읽기 전용 요청이 아니면 상위로 전파
  if (!isReadOnlyRequest || !error?.response) throw error;

  const navigate = useNavigate();

  useEffect(() => {
    // 인증 관련 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      resetErrorBoundary();
      navigate(routePaths.signIn);
    }
  }, [error, navigate, resetErrorBoundary]);

  const errorStatusCode = error.response.status;

  if (errorStatusCode === HTTP_STATUS.NOT_FOUND) {
    return <NotFound />;
  }

  // 권한이 없어도 보안을 위해 NotFound 띄움
  if (errorStatusCode === HTTP_STATUS.FORBIDDEN) {
    return <NotFound />;
  }

  if (errorStatusCode >= 500 && errorStatusCode < 600) {
    return <ServerError resetErrorBoundary={resetErrorBoundary} />;
  }

  // 처리되지 않은 에러 5xx로 간주
  return <ServerError resetErrorBoundary={resetErrorBoundary} />;
}

export default QueryErrorFallback;
