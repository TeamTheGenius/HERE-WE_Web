import Logo from '@/shared/ui/Logo';
import styles from './index.module.scss';
import ProfileImage from '@/entities/user/ui/ProfileImage';
import fallbackSource from '@/shared/assets/basic-profile-image-gray.png';
import Icon from '@/shared/ui/Icon';
function Header() {
  return (
    <header className={styles.header}>
      <Logo size="md" />
      <div className={styles.headerUserActions}>
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
