import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface PlaceBodyProps extends PropsWithChildren {
  as?: 'div' | 'button';
  handleClick?: () => void;
}

interface PlaceTitleProps extends PropsWithChildren {
  as?: 'h3' | 'button';
  handleClick?: () => void;
}

function PlaceHeader({ children }: PropsWithChildren) {
  return <div className={styles.header}>{children}</div>;
}

function PlaceTitle({ as: Component = 'button', handleClick, children }: PlaceTitleProps) {
  const isButton = Component === 'button';

  return (
    <Component className={styles.title} {...(isButton && handleClick ? { onClick: handleClick } : {})}>
      {children}
    </Component>
  );
}

function PlaceButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

function PlaceButtons({ children }: PropsWithChildren) {
  return <div className={styles.buttons}>{children}</div>;
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
  Buttons: PlaceButtons,
  Button: PlaceButton,
  Detail: PlaceDetail,
});
