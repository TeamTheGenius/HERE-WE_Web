import { ElementType, PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';
import styles from './index.module.scss';

type Font =
  | 'display-large'
  | 'display-small'
  | 'heading-large'
  | 'heading-medium'
  | 'heading-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'caption-medium'
  | 'caption-small';

type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'placeholder'
  | 'disabled'
  | 'brand'
  | 'link'
  | 'link-hover'
  | 'notice';

interface TextProps extends PropsWithChildren {
  font?: Font;
  color?: Color;
  as: ElementType;
}

export default function Text({ font, color, children, as: Tag }: TextProps) {
  return <Tag className={cn(styles[`font-${font}`], styles[`color-${color}`])}>{children}</Tag>;
}
