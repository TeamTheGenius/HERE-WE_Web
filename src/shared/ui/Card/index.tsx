import styles from './index.module.scss';
import Badge from '../Badge';
import { PropsWithChildren } from 'react';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';

interface CardImageProps {
  src: string;
  alt: string;
}

const ImageComponent = (<CardImage src="" alt="" />).type;
const TitleComponent = (<CardTitle />).type;
const DetailComponent = (<CardDetail />).type;
const MetadataComponent = (<CardMetadata />).type;
const BadgeComponent = (<CardTag />).type;

function Main({ children }: PropsWithChildren) {
  const imageElements = filterChildrenByComponent(children, ImageComponent);
  const titleElements = filterChildrenByComponent(children, TitleComponent);
  const detailElements = filterChildrenByComponent(children, DetailComponent);
  const metadataElements = filterChildrenByComponent(children, MetadataComponent);
  const badgeElements = filterChildrenByComponent(children, BadgeComponent);

  const hasContent = titleElements.length > 0 || detailElements.length > 0 || metadataElements.length > 0;
  const hasDetailElement = detailElements.length > 0;
  const hasMetadataElement = metadataElements.length > 0;

  return (
    <article>
      <button className={styles.wrapper}>
        {imageElements}
        {badgeElements}
        {hasContent && (
          <div className={styles.content}>
            {titleElements}
            {hasDetailElement && <div className={styles.detailContainer}>{detailElements}</div>}
            {hasMetadataElement && <div className={styles.metaContainer}>{metadataElements}</div>}
          </div>
        )}
      </button>
    </article>
  );
}

function CardImage({ src, alt }: CardImageProps) {
  return <img src={src} className={styles.image} alt={alt} />;
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

function CardTag({ ...props }) {
  return <Badge className={styles.tag} {...props} />;
}

export const Card = Object.assign(Main, {
  Tag: CardTag,
  Image: CardImage,
  Title: CardTitle,
  Detail: CardDetail,
  Metadata: CardMetadata,
});
