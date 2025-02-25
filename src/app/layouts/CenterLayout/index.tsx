import { Outlet } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';
import styles from './index.module.scss';

function CenterLayout() {
  return (
    <div className={cn('flex justify-center items-center', styles.wrapper)}>
      <div className={cn('w-full p-xs', styles.container)}>
        <Outlet />
      </div>
    </div>
  );
}

export default CenterLayout;
