import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface PlaceBodyProps extends PropsWithChildren {
  as?: 'div' | 'button';
  handleClick?: () => void;
}

interface PlaceButtonProps extends PropsWithChildren {
  handleClick: () => void;
}

function PlaceHeader({ children }: PropsWithChildren) {
  return <div className={styles.header}>{children}</div>;
}

function PlaceTitle({ children }: PropsWithChildren) {
  return <h3 className={styles.title}>{children}</h3>;
}

function PlaceButton({ children, handleClick }: PlaceButtonProps) {
  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
}

function PlaceBody({ as: Component = 'button', handleClick, children }: PlaceBodyProps) {
  const isButton = Component === 'button';

  return (
    <Component className={styles.body} {...(isButton && handleClick ? { onClick: handleClick } : {})}>
      {children}
    </Component>
  );
}

function PlaceDetail({ children }: PropsWithChildren) {
  return <p className={styles.detail}>{children}</p>;
}

function Main({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}

export const PlaceCard = Object.assign(Main, {
  Header: PlaceHeader,
  Body: PlaceBody,
  Title: PlaceTitle,
  Button: PlaceButton,
  Detail: PlaceDetail,
});
