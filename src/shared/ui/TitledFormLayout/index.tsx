import { FormEvent, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import Button from '../Button';

interface TitledFormLayoutFormProps extends PropsWithChildren {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function Main({ children }: PropsWithChildren) {
  return <main className={styles.container}>{children}</main>;
}

function TitledFormLayoutTitle({ children }: PropsWithChildren) {
  return <h2 className={styles.title}>{children}</h2>;
}

function TitledFormLayoutForm({ children, handleSubmit }: TitledFormLayoutFormProps) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
    </form>
  );
}

function TitledFormLayoutButton({ children }: PropsWithChildren) {
  return (
    <div className={styles.submitButtonWrapper}>
      <Button type="submit" size="lg" className={styles.submitButton}>
        {children}
      </Button>
    </div>
  );
}

export const TitledFormLayout = Object.assign(Main, {
  Title: TitledFormLayoutTitle,
  Form: TitledFormLayoutForm,
  Button: TitledFormLayoutButton,
});
