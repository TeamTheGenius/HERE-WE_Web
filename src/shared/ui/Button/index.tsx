import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './index.module.scss';
import Icon from '../Icon';
import type { IconType, TextColorType } from '../../types/design-system';

export type ButtonType = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonType;
  size: 'large' | 'medium' | 'small';
  text?: string;
  icon?: IconType;
  iconFill?: TextColorType;
  className?: string;
  onClick?: () => void;
}

function Button({
  variant = 'primary',
  size = 'medium',
  onClick,
  text,
  icon,
  iconFill = 'text-primary',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, styles[`${variant}-button`], styles[`${size}-button`], className)}
      {...rest}
    >
      {icon && <Icon icon={icon} fill={iconFill} iconSize="20" />}
      {text && text}
    </button>
  );
}

export default Button;
