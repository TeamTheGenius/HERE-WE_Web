import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './index.module.scss';

function HeaderLayout() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

export default HeaderLayout;
