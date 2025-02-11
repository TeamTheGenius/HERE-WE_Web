import { ElementType, PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';
import styles from './index.module.scss';
import type { FontType, TextColorType } from '../../types/design-system';

interface TextProps extends PropsWithChildren {
  font?: FontType;
  color?: TextColorType;
  as: ElementType;
}

export default function Text({ font, color, children, as: Tag }: TextProps) {
  return <Tag className={cn(styles[`font-${font}`], styles[`color-${color}`])}>{children}</Tag>;
}
