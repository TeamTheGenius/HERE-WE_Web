import { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import ProfileImageInput from '../ProfileImageInput';
import NicknameInput from '../ProfileNicknameInput';
import Button from '@/shared/ui/Button';

export interface MainProps extends PropsWithChildren {
  handlSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Main({ children, handlSubmit }: MainProps) {
  return (
    <form className={styles.wrapper} onSubmit={handlSubmit}>
      {children}
    </form>
  );
}

function SubmitButton({ children }: PropsWithChildren) {
  return (
    <Button variant="primary" size="lg" type="submit">
      {children}
    </Button>
  );
}

export const ProfileForm = Object.assign(Main, {
  Image: ProfileImageInput,
  Nickname: NicknameInput,
  SubmitButton,
});
