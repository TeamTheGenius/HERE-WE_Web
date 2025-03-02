import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

function GridContainer({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

export default GridContainer;
