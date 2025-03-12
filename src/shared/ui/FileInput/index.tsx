import { createContext, PropsWithChildren, useContext, useId, forwardRef, ForwardedRef } from 'react';
import styles from './index.module.scss';
import { cn } from '../../lib/cn';
import { filterChildrenByComponent } from '@/shared/lib/reactChildren';
import Icon from '../Icon';

interface FileInputContextType {
  inputId: string;
}

interface LabelProps extends PropsWithChildren {
  handleClick: () => void;
  imagePreview: string | undefined;
}

interface TitleProps extends PropsWithChildren {
  isVisible?: boolean;
  isRequired?: boolean;
}

interface MessageProps extends PropsWithChildren {
  variant: 'success' | 'information' | 'warning';
}

const ForwardedInput = forwardRef(Input);
const MessageComponent = (<Message variant="warning" />).type;
const InputComponent = (<ForwardedInput placeholder="" hasError={false} />).type;
const LabelComponent = (<Label handleClick={() => {}} imagePreview="" />).type;
const TitleComponent = (<Title />).type;
const FileInputContext = createContext<FileInputContextType | null>(null);

function Main({ children }: PropsWithChildren) {
  const inputId = useId();

  const titleElement = filterChildrenByComponent(children, TitleComponent);
  const labelElement = filterChildrenByComponent(children, LabelComponent);
  const inputElement = filterChildrenByComponent(children, InputComponent);
  const messageElement = filterChildrenByComponent(children, MessageComponent);

  return (
    <FileInputContext.Provider value={{ inputId }}>
      <div>
        {titleElement}
        <div className={styles.contentContainer}>
          {inputElement}
          {labelElement}
          {messageElement}
        </div>
      </div>
    </FileInputContext.Provider>
  );
}

function Title({ isVisible = true, isRequired = false, children }: TitleProps) {
  return (
    <label className={cn(isVisible ? styles.titleContainer : styles.blind)}>
      <span className={styles.title}>{children}</span>
      {isRequired && <span className={styles.requiredInputTitle}>{' * '}</span>}
    </label>
  );
}

function Label({ handleClick, imagePreview }: LabelProps) {
  const context = useContext(FileInputContext);
  if (!context) return null;
  const { inputId } = context;

  return (
    <>
      <label className={styles.label} id={inputId} onClick={handleClick}>
        {imagePreview ? (
          <img src={imagePreview} alt="" className={styles.previewImage} />
        ) : (
          <>
            <Icon icon="upload" iconSize="24" color="text-tertiary" />
            <span className={styles.labelText}>Drag files to upload</span>
          </>
        )}
      </label>
    </>
  );
}

function Input({ ...props }, ref: ForwardedRef<HTMLInputElement>) {
  const context = useContext(FileInputContext);
  if (!context) return null;
  const { inputId } = context;

  return <input type="file" id={inputId} accept="image/*" className={styles.fileInput} ref={ref} {...props} />;
}

function Message({ children, variant }: MessageProps) {
  return <span className={cn(styles[`${variant}-message`], styles.message)}>{children}</span>;
}

export const FileInput = Object.assign(Main, {
  Title,
  Label,
  Input: ForwardedInput,
  Message,
});
