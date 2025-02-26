import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

export function ProfileNickname({ children }: PropsWithChildren) {
  return <span className={styles.nickname}>{children}</span>;
}
