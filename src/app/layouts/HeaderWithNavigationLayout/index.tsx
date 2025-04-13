import { Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import styles from './index.module.scss';
import Header from '../Header';

function HeaderWithNavigationLayout() {
  return (
    <div className={styles.headerLayout}>
      <Header />
      <div className={styles.navigationLayout}>
        <NavigationBar className={styles.navigation} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HeaderWithNavigationLayout;
