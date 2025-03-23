import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';
import Overlay from '../Overlay';
import Button, { ButtonProps } from '../Button';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';
import { cn } from '@/shared/lib/cn';

interface MainProps extends PropsWithChildren {
  isOpen: boolean;
}

function Main({ children, isOpen }: MainProps) {
  const overlayElement = filterChildrenByComponent(children, Overlay);
  const titleElement = filterChildrenByComponent(children, ModalTitle);
  const descriptionElement = filterChildrenByComponent(children, ModalDescription);
  const bodyElement = filterChildrenByComponent(children, ModalBody);
  const leftButtonElement = filterChildrenByComponent(children, ModalLeftButton);
  const rightButtonElement = filterChildrenByComponent(children, ModalRightButton);

  return (
    <ModalPortal>
      <div
        className={cn(
          {
            [styles.modalRootOpen]: isOpen,
            [styles.modalRootClose]: !isOpen,
          },
          styles.modalRoot,
        )}
      >
        {overlayElement}
        <div className={styles.modal}>
          {titleElement}
          <div className={styles.modalContent}>
            {descriptionElement}
            {bodyElement}
          </div>
          <div className={styles.modalButtons}>
            {leftButtonElement}
            {rightButtonElement}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

function ModalTitle({ children }: PropsWithChildren) {
  return <h1 className={styles.modalTitle}>{children}</h1>;
}

function ModalDescription({ children }: PropsWithChildren) {
  return <p className={styles.modalDescription}> {children}</p>;
}

function ModalBody({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

function ModalLeftButton({ children, ...rest }: ButtonProps) {
  return (
    <Button variant="secondary" {...rest}>
      {children}
    </Button>
  );
}

function ModalRightButton({ children, ...rest }: ButtonProps) {
  return (
    <Button variant="primary" {...rest}>
      {children}
    </Button>
  );
}

function ModalPortal({ children }: PropsWithChildren) {
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return;
  return createPortal(children, modalRoot);
}

export const Modal = Object.assign(Main, {
  Overlay,
  Title: ModalTitle,
  Content: ModalBody,
  Description: ModalDescription,
  LeftButton: ModalLeftButton,
  RightButton: ModalRightButton,
});
