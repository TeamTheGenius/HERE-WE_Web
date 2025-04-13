import Logo from '@/shared/ui/Logo';
import styles from './index.module.scss';
import Icon from '@/shared/ui/Icon';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

function Header() {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate(routePaths.main);
  };

  return (
    <header className={styles.header}>
      <Logo as="button" handleClick={handleClickLogo} size="md" />
      <div className={styles.headerUserActions}>
        <button onClick={themeContext?.toggleTheme} className={styles.iconButton}>
          <Icon icon="theme" iconSize="24" color="text-primary" />
        </button>

        {/*         <button>
          <ProfileImage size="small" src={fallbackSource} />
        </button> */}
        <button className={styles.iconButton}>
          <Icon iconSize="24" icon="alarm" color="text-secondary" />
        </button>
      </div>
    </header>
  );
}

export default Header;
