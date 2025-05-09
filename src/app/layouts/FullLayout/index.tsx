import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './index.module.scss';

function FullLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default FullLayout;
