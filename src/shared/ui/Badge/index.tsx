import { IconType, TextColorType } from '@/shared/types/design-system';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import Icon from '../Icon';

type BadgeType = 'primary' | 'secondary' | 'tertiary';

interface BadgeProps {
  icon?: IconType;
  text?: string;
  variant?: BadgeType;
  className?: string;
}

function Badge({ icon, text, variant = 'primary', className }: BadgeProps) {
  const iconColorMap: Record<BadgeType, TextColorType> = {
    primary: 'text-default',
    secondary: 'text-default',
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
    </span>
  );
}

export default Badge;
