import { Outlet } from 'react-router-dom';
import Header from '../Header';
import NavigationBar from '../NavigationBar';
import styles from './index.module.scss';

function NavigationLayout() {
  return (
    <>
      <Header />
      <NavigationBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

export default NavigationLayout;
