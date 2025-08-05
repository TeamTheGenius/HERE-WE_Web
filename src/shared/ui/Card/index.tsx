import styles from './index.module.scss';
import Badge, { BadgeProps } from '../Badge';
import { PropsWithChildren } from 'react';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';
import { cn } from '@/shared/lib/cn';

interface CardImageProps {
  src: string;
  alt: string;
}

interface MainProps extends PropsWithChildren {
  size?: 'full' | 'md';
  classNames?: string;
  handleClick?: () => void;
  border?: boolean;
}

function Main({ children, size = 'full', classNames, handleClick, border }: MainProps) {
  const className = cn(
    styles.wrapper,
    {
      [styles.fullCard]: size === 'full',
      [styles.mdCard]: size === 'md',
      [styles.wrapperBorder]: border === true,
    },
    classNames,
  );

  return (
    <article>
      {handleClick ? (
        <button onClick={handleClick} className={className}>
          {children}
        </button>
      ) : (
        <div className={className}>{children}</div>
      )}
    </article>
  );
}

function CardImage({ src, alt }: CardImageProps) {
  return (
    <div className={styles.imageContainer}>
      <img src={src} className={styles.image} alt={alt} />
    </div>
  );
}

function CardText({ children }: PropsWithChildren) {
  const titleElements = filterChildrenByComponent(children, CardTitle);
  const detailElements = filterChildrenByComponent(children, CardDetail);
  const metadataElements = filterChildrenByComponent(children, CardMetadata);

  const hasDetailElement = detailElements.length > 0;
  const hasMetadataElement = metadataElements.length > 0;

  return (
    <div className={styles.content}>
      {titleElements}
      {hasDetailElement && <div className={styles.detailContainer}>{detailElements}</div>}
      {hasMetadataElement && <div className={styles.metaContainer}>{metadataElements}</div>}
    </div>
  );
}

function CardTitle({ children }: PropsWithChildren) {
  return <h3 className={styles.title}>{children}</h3>;
}

function CardDetail({ children }: PropsWithChildren) {
  return <p className={styles.detail}>{children}</p>;
}

function CardMetadata({ children }: PropsWithChildren) {
  return <p className={styles.meta}>{children}</p>;
}

function CardTag({ ...props }: BadgeProps) {
  return <Badge className={styles.tag} {...props} />;
}

export const Card = Object.assign(Main, {
  Tag: CardTag,
  Image: CardImage,
  Text: CardText,
  Title: CardTitle,
  Detail: CardDetail,
  Metadata: CardMetadata,
});
