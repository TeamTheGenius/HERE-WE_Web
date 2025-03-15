import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

function MemberJoinedDate({ children }: PropsWithChildren) {
  return <span className={styles.memberJoinedDate}>{children}</span>;
}

export default MemberJoinedDate;
