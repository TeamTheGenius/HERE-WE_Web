import clsx from 'clsx';
import styles from './index.module.scss';

interface LogoProps {
  haveIntroduce?: boolean;
  size: 'lg' | 'md';
}

function Logo({ haveIntroduce = false, size }: LogoProps) {
  const logo = <h1 className={clsx({ [styles.lgLogo]: size === 'lg', [styles.mdLogo]: size === 'md' })}>HERE:WE</h1>;

  return haveIntroduce ? (
    <hgroup className={styles.wrapper}>
      <h2 className={styles.introduce}>모임을 더 쉽게, 소중한 순간은 더 오래</h2>
      {logo}
    </hgroup>
  ) : (
    logo
  );
}

export default Logo;
