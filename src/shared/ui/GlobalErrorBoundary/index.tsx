import { FallbackProps } from 'react-error-boundary';

function GlobalErrorBoundary({ resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <div>예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </>
  );
}

export default GlobalErrorBoundary;
