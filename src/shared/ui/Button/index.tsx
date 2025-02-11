import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './index.module.scss';
import Icon from '../Icon';
import type { IconType, TextColorType } from '../../types/design-system';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  size: 'large' | 'medium' | 'small';
  text?: string;
  icon?: IconType;
  iconFill?: TextColorType;
  className?: string;
}

function Button({
  variant = 'primary',
  size = 'medium',
  text,
  icon,
  iconFill = 'text-primary',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={cn(styles.button, styles[`${variant}-button`], styles[`${size}-button`], className)}>
      {icon && <Icon icon={icon} fill={iconFill} iconSize="20" />}
      {text && text}
    </button>
  );
}

export default Button;
