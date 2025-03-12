import { cn } from '@/shared/lib/cn';
import styles from './index.module.scss';
import { IconType } from '@/shared/types/design-system';
import Icon from '../Icon';
import { useNavigate } from 'react-router-dom';

interface NavigationItemProps {
  icon: IconType;
  title: string;
  to: string;
}

function NavitationItem({ icon, title, to }: NavigationItemProps) {
  const navigate = useNavigate();

  const handleNavigationItemClick = () => {
    navigate(to);
  };

  const currentUrl = new URL(window.location.href);
  const targetUrl = new URL(to, window.location.href);

  const isActive = currentUrl.pathname.split('/')[1] === targetUrl.pathname.split('/')[1];

  return (
    <button className={cn(styles.item)} onClick={handleNavigationItemClick}>
      <Icon icon={icon} iconSize="20" color={isActive ? 'text-brand' : 'text-secondary'} />
      <span
        className={cn({
          [styles.itemTitleActive]: isActive,
          [styles.itemTitleInactive]: !isActive,
        })}
      >
        {title}
      </span>
    </button>
  );
}

export default NavitationItem;
