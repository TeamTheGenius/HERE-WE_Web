import { ToastType } from '@/shared/store/toastStore';
import { PropsWithChildren } from 'react';
import Icon from '../Icon';
import styles from './index.module.scss';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';
import { cn } from '@/shared/lib/cn';

interface ToastIconProps {
  type: ToastType;
}

interface ToastActionButtonProps extends PropsWithChildren {
  handleAction: () => void;
}

interface ToastBarProps {
  type: ToastType;
}

interface ToastRemoveButtonProps {
  handleRemove: () => void;
}

function ToastMain({ children }: PropsWithChildren) {
  const headerElement = filterChildrenByComponent(children, ToastHeader);
  const bodyElement = filterChildrenByComponent(children, ToastBody);
  const footerElement = filterChildrenByComponent(children, ToastFooter);

  return (
    <div className={styles.toast}>
      {headerElement}
      <div className={styles.toastContent}>
        {bodyElement}
        {footerElement}
      </div>
    </div>
  );
}

function ToastHeader({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

function ToastBar({ type }: ToastBarProps) {
  return (
    <div
      className={cn(
        {
          [styles.toastBarSuccess]: type === 'success',
          [styles.toastBarError]: type === 'error',
          [styles.toastBarWarning]: type === 'warning',
          [styles.toastBarAction]: type === 'action',
        },
        styles.toastBar,
      )}
    />
  );
}

function ToastIcon({ type }: ToastIconProps) {
  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'error':
        return <Icon icon="error" iconSize="24" color="text-error" />;
      case 'success':
        return <Icon icon="success" iconSize="24" color="text-success" />;
      case 'warning':
        return <Icon icon="warning" iconSize="24" color="text-warning" />;
    }
  };
  return <div className={styles.toastIcon}>{getIcon(type)}</div>;
}

function ToastBody({ children }: PropsWithChildren) {
  return <div className={styles.toastBody}>{children}</div>;
}

function ToastTitle({ children }: PropsWithChildren) {
  return <div className={styles.toastTitle}>{children}</div>;
}

function ToastMessage({ children }: PropsWithChildren) {
  return <p className={styles.toastMessage}>{children}</p>;
}

function ToastFooter({ children }: PropsWithChildren) {
  return <div className={styles.toastFooter}>{children}</div>;
}

function ToastRemoveButton({ handleRemove }: ToastRemoveButtonProps) {
  return (
    <button className={styles.toastIcon} onClick={handleRemove}>
      <Icon icon="cross" color="text-primary" iconSize="16" />
    </button>
  );
}

function ToastActionButton({ handleAction, children }: ToastActionButtonProps) {
  return (
    <button onClick={handleAction} className={styles.toastActionButton}>
      {children}
    </button>
  );
}

export const Toast = Object.assign(ToastMain, {
  Header: ToastHeader,
  Bar: ToastBar,
  Icon: ToastIcon,
  Body: ToastBody,
  Title: ToastTitle,
  Message: ToastMessage,
  Footer: ToastFooter,
  RemoveButton: ToastRemoveButton,
  ActionButton: ToastActionButton,
});
