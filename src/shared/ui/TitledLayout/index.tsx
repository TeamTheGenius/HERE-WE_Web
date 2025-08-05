import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

function Main({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

function TitledLayoutTitle({ children }: PropsWithChildren) {
  return <h2 className={styles.title}>{children}</h2>;
}

function TitledLayoutContent({ children }: PropsWithChildren) {
  return <div className={styles.content}>{children}</div>;
}

export const TitledLayout = Object.assign(Main, {
  Title: TitledLayoutTitle,
  Content: TitledLayoutContent,
});
