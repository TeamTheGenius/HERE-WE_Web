import clsx from 'clsx';
import styles from './index.module.scss';
import { ElementType } from 'react';

interface LogoProps {
  haveIntroduce?: boolean;
  size: 'lg' | 'md';
  as?: ElementType;
  handleClick?: () => void;
}

function Logo({ haveIntroduce = false, size, as: Tag = 'h1', handleClick }: LogoProps) {
  const logo = (
    <Tag
      className={clsx({
        [styles.lgLogo]: size === 'lg',
        [styles.mdLogo]: size === 'md',
      })}
      onClick={handleClick}
    >
      HERE:WE
    </Tag>
  );

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
