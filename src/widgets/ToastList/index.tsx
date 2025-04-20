import { useRemoveToast, useToasts } from '@/shared/hooks/useToast';
import { Toast } from '@/shared/ui/Toast';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

function ToastList() {
  const toastList = useToasts();
  const removeToast = useRemoveToast();

  const toastRoot = document.getElementById('toast');
  if (!toastRoot) return null;

  const TostList = toastList.map((toast) => (
    <li key={toast.id} className={styles.toastItem}>
      <Toast>
        <Toast.Header>
          <Toast.Bar type={toast.type} />
          <Toast.Icon type={toast.type} />
        </Toast.Header>
        <Toast.Body>
          {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
          <Toast.Message>{toast.message}</Toast.Message>
        </Toast.Body>
        <Toast.Footer>
          {toast.onAction && toast.actionLabel ? (
            <Toast.ActionButton handleAction={toast.onAction}>{toast.actionLabel}</Toast.ActionButton>
          ) : (
            <Toast.RemoveButton handleRemove={() => removeToast(toast.id)} />
          )}
        </Toast.Footer>
      </Toast>
    </li>
  ));

  return createPortal(<ul className={styles.toastContainer}>{TostList}</ul>, toastRoot);
}

export default ToastList;
