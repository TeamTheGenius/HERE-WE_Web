import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './index.module.scss';
import Icon from '../Icon';
import type { IconType, TextColorType } from '../../types/design-system';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: 'lg' | 'md' | 'sm';
  text?: string;
  icon?: IconType;
  iconColor?: TextColorType;
  className?: string;
  onClick?: () => void;
}

function Button({ variant = 'primary', size = 'md', onClick, text, icon, iconColor, className, ...rest }: ButtonProps) {
  const computedIconColor: TextColorType = iconColor ?? (variant === 'primary' ? 'text-default' : 'text-secondary');

  return (
    <button
      onClick={onClick}
      className={cn(styles.button, styles[`${variant}-button`], styles[`${size}-button`], className)}
      {...rest}
    >
      {icon && <Icon icon={icon} color={computedIconColor} iconSize="20" />}
      {text && text}
    </button>
  );
}

export default Button;
