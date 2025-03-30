import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './index.module.scss';

function FullLayout() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

export default FullLayout;
