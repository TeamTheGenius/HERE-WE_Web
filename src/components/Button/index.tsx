import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './index.module.scss';
import SVGIcon from '../SVGIcon';

type IconID =
  | 'calendar'
  | 'kakao'
  | 'home'
  | 'naver'
  | 'pencil'
  | 'people'
  | 'people-stroke'
  | 'crown'
  | 'google'
  | 'sound'
  | 'chat'
  | 'send';

type IconFill =
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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  size: 'lg' | 'md' | 'sm';
  text?: string;
  iconID?: IconID;
  iconFill?: IconFill;
  className?: string;
}

function Button({
  variant = 'primary',
  size = 'md',
  text,
  iconID,
  iconFill = 'primary',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={cn(styles.button, styles[`button--${variant}`], styles[`button--${size}`], className)}>
      {iconID && <SVGIcon id={iconID} fill={iconFill} />}
      {text && text}
    </button>
  );
}

export default Button;
