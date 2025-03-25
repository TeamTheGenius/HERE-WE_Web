import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

function Main({ children }: PropsWithChildren) {
  return <fieldset>{children}</fieldset>;
}

interface InputGroupTitleProps extends PropsWithChildren {
  isRequired?: boolean;
}

function InputGroupTitle({ children, isRequired }: InputGroupTitleProps) {
  return (
    <legend className={styles.labelContainer}>
      <span className={styles.label}>{children}</span>
      {isRequired && <span className={styles.requiredInputLabel}>{' * '}</span>}
    </legend>
  );
}

function InputGroupContent({ children }: PropsWithChildren) {
  return <div className={styles.content}>{children}</div>;
}

export const InputGroup = Object.assign(Main, {
  Title: InputGroupTitle,
  Content: InputGroupContent,
});
