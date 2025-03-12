import NavitationItem from '@/app/layouts/NavigationItem';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function NavigationBar() {
  const { crewId } = useParams();

  const getRoutePath = (url: string) => {
    return url.replace(/:\w+/, crewId ?? '');
  };

  return (
    <nav className={styles.navigationBar}>
      <NavitationItem icon="home" title="홈" to={getRoutePath(routePaths.home)} />
      <NavitationItem icon="people" title="크루원" to={getRoutePath(routePaths.member)} />
      <NavitationItem icon="chat" title="채팅" to={getRoutePath(routePaths.chat)} />
      <NavitationItem icon="pencil" title="모먼트" to={getRoutePath(routePaths.moment)} />
    </nav>
  );
}

export default NavigationBar;
