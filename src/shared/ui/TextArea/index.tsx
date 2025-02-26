import {
  createContext,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  TextareaHTMLAttributes,
  useContext,
  useId,
} from 'react';
import styles from './index.module.scss';
import { cn } from '@/shared/lib/cn';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';

interface TextAreaContextType {
  inputId: string;
}

const TextAreaContext = createContext<TextAreaContextType | null>(null);

interface AreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  hasError: boolean;
}

const Area = forwardRef<HTMLTextAreaElement, AreaProps>(
  ({ placeholder, hasError, ...props }, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const context = useContext(TextAreaContext);

    if (!context) return null;
    const { inputId } = context;

    return (
      <textarea
        id={inputId}
        placeholder={placeholder}
        className={cn(hasError && styles.areaError, styles.area)}
        ref={ref}
        {...props}
      />
    );
  },
);

const MessageComponent = (<Message variant="warning" />).type;
const AreaComponent = (<Area placeholder="" hasError={false} />).type;
const LabelComponent = (<Label />).type;

function Main({ children }: PropsWithChildren) {
  const inputId = useId();

  const labelElement = filterChildrenByComponent(children, LabelComponent);
  const areaElement = filterChildrenByComponent(children, AreaComponent);
  const messageElement = filterChildrenByComponent(children, MessageComponent);

  return (
    <TextAreaContext.Provider value={{ inputId }}>
      <div className={styles.textAreaContainer}>
        {labelElement}
        <div className={styles.container}>
          {areaElement}
          {messageElement}
        </div>
      </div>
    </TextAreaContext.Provider>
  );
}

interface LabelProps extends PropsWithChildren {
  isVisible?: boolean;
  isRequired?: boolean;
}

function Label({ isVisible = true, isRequired = false, children }: LabelProps) {
  const context = useContext(TextAreaContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <label htmlFor={inputId} className={cn(isVisible ? styles.labelContainer : styles.blind)}>
      <span className={styles.label}>{children}</span>
      {isRequired && <span className={styles.requiredInputLabel}>{' * '}</span>}
    </label>
  );
}

interface MessageProps extends PropsWithChildren {
  variant: 'success' | 'information' | 'warning';
}

function Message({ children, variant }: MessageProps) {
  return <span className={cn(styles[`${variant}-message`], styles.message)}>{children}</span>;
}

export const TextArea = Object.assign(Main, {
  Label,
  Area,
  Message,
});
