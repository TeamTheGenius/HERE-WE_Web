import { FormEvent, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import Button from '../Button';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';

interface MainProps extends PropsWithChildren {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const TitleComponent = (<TitledFormLayoutTitle />).type;
const FormComponent = (<TitledFormLayoutForm />).type;
const ButtonComponent = (<TitledFormLayoutButton />).type;

function Main({ children, handleSubmit }: MainProps) {
  const titleElement = filterChildrenByComponent(children, TitleComponent);
  const formElement = filterChildrenByComponent(children, FormComponent);
  const buttonElement = filterChildrenByComponent(children, ButtonComponent);

  return (
    <main className={styles.container}>
      {titleElement}
      <form onSubmit={handleSubmit} className={styles.form}>
        {formElement}
        {buttonElement}
      </form>
    </main>
  );
}

function TitledFormLayoutTitle({ children }: PropsWithChildren) {
  return <h2 className={styles.title}>{children}</h2>;
}

function TitledFormLayoutForm({ children }: PropsWithChildren) {
  return <>{children}</>;
}

function TitledFormLayoutButton({ children }: PropsWithChildren) {
  return (
    <div className={styles.submitButtonWrapper}>
      <Button size="lg" className={styles.submitButton}>
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
