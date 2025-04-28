import Logo from '@/shared/ui/Logo';
import styles from './index.module.scss';
import Icon from '@/shared/ui/Icon';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';
import ProfileImageBase from '@/entities/user/ui/ProfileImageBase';
import useUserStore from '@/shared/store/userStore';

function Header() {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const profileImage = useUserStore((state) => state.profileImage);

  const handleClickLogo = () => {
    navigate(routePaths.main);
  };

  return (
    <header className={styles.header}>
      <Logo as="button" handleClick={handleClickLogo} size="md" />
      <div className={styles.headerUserActions}>
        <button onClick={themeContext?.toggleTheme} className={styles.headerButton}>
          <Icon icon="theme" iconSize="28" color="text-primary" />
        </button>
        {/*         <button className={styles.headerButton}>
          <Icon iconSize="28" icon="alarm" color="text-secondary" />
        </button> */}
        <button className={styles.headerButton}>
          <ProfileImageBase size="small" src={profileImage || ''} />
        </button>
      </div>
    </header>
  );
}

export default Header;
