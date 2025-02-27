import Logo from '@/shared/ui/Logo';
import styles from './index.module.scss';
import ProfileImage from '@/entities/user/ui/ProfileImage';
import fallbackSource from '@/shared/assets/basic-profile-image-gray.png';
import Icon from '@/shared/ui/Icon';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

function Header() {
  const themeContext = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <Logo size="md" />
      <div className={styles.headerUserActions}>
        <button onClick={themeContext?.toggleTheme} className={styles.themeButton}>
          임시 테마 버튼
        </button>
        <button>
          <ProfileImage size="small" src={fallbackSource} />
        </button>
        <button>
          <Icon iconSize="28" icon="alarm" color="text-secondary" />
        </button>
      </div>
    </header>
  );
}

export default Header;
