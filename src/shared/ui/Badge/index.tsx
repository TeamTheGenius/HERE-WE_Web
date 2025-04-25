import { IconType, TextColorType } from '@/shared/types/design-system';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import Icon from '../Icon';
import { PropsWithChildren } from 'react';

export type BadgeType = 'primary' | 'secondary' | 'tertiary';

export interface BadgeProps extends PropsWithChildren {
  icon?: IconType;
  text?: string;
  variant?: BadgeType;
  className?: string;
}

function Badge({ icon, text, variant = 'primary', className, children }: BadgeProps) {
  const iconColorMap: Record<BadgeType, TextColorType> = {
    primary: 'text-white',
    secondary: 'text-white',
    tertiary: 'text-tertiary',
  };
  return (
    <span
      className={cn(
        styles.container,
        {
          [styles.primaryBadge]: variant === 'primary',
          [styles.secondaryBadge]: variant === 'secondary',
          [styles.tertiaryBadge]: variant === 'tertiary',
        },
        className,
      )}
    >
      {icon && <Icon icon={icon} iconSize="16" color={iconColorMap[variant]} />}
      {text && <span>{text}</span>}
      {children}
    </span>
  );
}

export default Badge;
