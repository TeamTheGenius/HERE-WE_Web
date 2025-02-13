import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useContext,
  useId,
  Children,
  ReactNode,
  isValidElement,
} from 'react';
import styles from './index.module.scss';
import Button, { type ButtonType } from '../Button';
import { cn } from '../../lib/cn';

interface TextInputContextType {
  inputId: string;
}

interface LabelProps extends PropsWithChildren {
  isVisible?: boolean;
}

interface InputProps {
  placeholder: string;
  onChange: (input: string) => void;
}

interface ButtonProps extends PropsWithChildren {
  variant?: ButtonType;
  text: string;
  onClick?: () => void;
}

interface MessageProps extends PropsWithChildren {
  variant: 'success' | 'information' | 'warning';
}

const ButtonComponent = (<Action text="" onClick={() => {}} />).type;
const MessageComponent = (<Message variant="warning" />).type;
const InputComponent = (<Input placeholder="" onChange={() => {}} />).type;
const LabelComponent = (<Label />).type;

const TextInputContext = createContext<TextInputContextType | null>(null);

function getElements(children: ReactNode, component: JSX.Element['type']) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === component).slice(0, 2);
}

function Main({ children }: PropsWithChildren) {
  const inputId = useId();

  const labelElement = getElements(children, LabelComponent);
  const inputElement = getElements(children, InputComponent);
  const buttonElement = getElements(children, ButtonComponent);
  const messageElement = getElements(children, MessageComponent);

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

function Label({ isVisible = true, children }: LabelProps) {
  const context = useContext(TextInputContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <label htmlFor={inputId} className={cn(isVisible ? styles.label : styles.blind)}>
      {children}
    </label>
  );
}

function Message({ children, variant }: MessageProps) {
  return <span className={cn(styles[`${variant}-message`], styles.message)}>{children}</span>;
}

function Input({ placeholder, onChange }: InputProps) {
  const context = useContext(TextInputContext);
  if (!context) return;
  const { inputId } = context;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input type="text" id={inputId} placeholder={placeholder} onChange={handleInputChange} className={styles.input} />
  );
}

function Action({ text, variant = 'secondary', onClick }: ButtonProps) {
  return <Button variant={variant} text={text} size="medium" onClick={onClick} className={styles.button} />;
}

export const TextInput = Object.assign(Main, {
  Label,
  Input,
  Message,
  Button: Action,
});
