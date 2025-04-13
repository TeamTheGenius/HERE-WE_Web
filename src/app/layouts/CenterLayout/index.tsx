import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

function CenterLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default CenterLayout;
