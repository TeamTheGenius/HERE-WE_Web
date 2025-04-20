import NavitationItem from '@/app/layouts/NavigationItem';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';
import { cn } from '@/shared/lib/cn';

interface NavigationBarProps {
  className?: string;
}

function NavigationBar({ className }: NavigationBarProps) {
  const { crewId } = useParams();

  const getRoutePath = (url: string) => {
    return url.replace(/:\w+/, crewId ?? '');
  };

  return (
    <nav className={cn(styles.navigationBar, className)}>
      <NavitationItem icon="home" title="홈" to={getRoutePath(routePaths.home.path)} />
      <NavitationItem icon="people" title="크루원" to={getRoutePath(routePaths.member)} />
      <NavitationItem icon="chat" title="채팅" to={getRoutePath(routePaths.chat)} />
      <NavitationItem icon="pencil" title="모먼트" to={getRoutePath(routePaths.moment)} />
    </nav>
  );
}

export default NavigationBar;
