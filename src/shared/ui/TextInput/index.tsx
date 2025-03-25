import {
  createContext,
  PropsWithChildren,
  useContext,
  useId,
  InputHTMLAttributes,
  forwardRef,
  ForwardedRef,
  ButtonHTMLAttributes,
} from 'react';
import styles from './index.module.scss';
import Button, { type ButtonType } from '../Button';
import { cn } from '../../lib/cn';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';

interface TextInputContextType {
  inputId: string;
}

interface LabelProps extends PropsWithChildren {
  isVisible?: boolean;
  isRequired?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  hasError?: boolean;
}

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonType;
  onClick?: () => void;
}

interface MessageProps extends PropsWithChildren {
  variant: 'success' | 'warning';
}

const ForwardedInput = forwardRef(Input);
const ButtonComponent = (<Action onClick={() => {}} />).type;
const MessageComponent = (<Message variant="warning" />).type;
const InputComponent = (<ForwardedInput placeholder="" hasError={false} />).type;
const LabelComponent = (<Label />).type;

const TextInputContext = createContext<TextInputContextType | null>(null);

function Main({ children }: PropsWithChildren) {
  const inputId = useId();

  const labelElement = filterChildrenByComponent(children, LabelComponent);
  const inputElement = filterChildrenByComponent(children, InputComponent);
  const buttonElement = filterChildrenByComponent(children, ButtonComponent);
  const messageElement = filterChildrenByComponent(children, MessageComponent);

  return (
    <TextInputContext.Provider value={{ inputId }}>
      <div className={styles.wrapper}>
        {labelElement}
        <div className={styles.container}>
          {inputElement}
          {buttonElement}
        </div>
        {messageElement}
      </div>
    </TextInputContext.Provider>
  );
}

function Label({ isVisible = true, isRequired = false, children }: LabelProps) {
  const context = useContext(TextInputContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <label htmlFor={inputId} className={cn(isVisible ? styles.labelContainer : styles.blind)}>
      <span className={styles.label}>{children}</span>
      {isRequired && <span className={styles.requiredInputLabel}>{' * '}</span>}
    </label>
  );
}

function Input({ placeholder, hasError, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const context = useContext(TextInputContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <input
      type="text"
      id={inputId}
      placeholder={placeholder}
      className={cn(hasError && styles.inputError, styles.input)}
      ref={ref}
      {...props}
    />
  );
}

function Message({ children, variant }: MessageProps) {
  return <span className={cn(styles[`${variant}-message`], styles.message)}>{children}</span>;
}

function Length({ children }: PropsWithChildren) {
  return <span className={cn(styles.lengthMessage, styles.message)}>{children}</span>;
}

function Action({ variant = 'secondary', onClick, ...props }: ButtonProps) {
  return <Button variant={variant} size="md" onClick={onClick} className={styles.button} {...props} />;
}

export const TextInput = Object.assign(Main, {
  Label,
  Input: ForwardedInput,
  Message,
  Button: Action,
  Length,
});
