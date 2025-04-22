import { usePostMomentJoin } from '@/features/moment/query/usePostmomentJoin';
import { useAddToast } from '@/shared/hooks/useToast';
import { useModal } from '@/shared/hooks/useModal';
import { ApiError, isModalError } from './error.type';

export function useHandleModalError(resetErrorBoundary: () => void, errorInfo: ApiError) {
  const { isOpen, openModal, closeModal } = useModal();
  const addToast = useAddToast();
  const { mutateAsync: joinMoment } = usePostMomentJoin();

  if (!isModalError(errorInfo)) return;

  const getParams = (resource: string) => {
    const match = window.location.pathname.match(new RegExp(`/${resource}/(\\d+)`));
    return match ? Number(match[1]) : null;
  };

  const handleClose = () => {
    closeModal();
    resetErrorBoundary();
  };

  const handleCommonAction = async (action: () => Promise<void>) => {
    await action();
    handleClose();
  };

  const handleJoinMoment = async () => {
    const momentId = getParams('moment');
    if (!momentId) return;

    await joinMoment({ momentId });
    addToast({ type: 'success', message: '참여 완료' });
  };

  const handleAction = async () => {
    switch (errorInfo.actionType) {
      case 'JOIN_MOMENT':
        await handleCommonAction(handleJoinMoment);
        break;
      default:
        // 기본 동작
        handleClose();
        break;
    }
  };

  return {
    isOpen,
    openModal,
    handleClose,
    handleAction,
  };
}
