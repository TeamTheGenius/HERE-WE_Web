import { PropsWithChildren } from 'react';
import Icon, { IconProps } from '../Icon';
import styles from './index.module.scss';
import Button, { ButtonProps } from '../Button';

function Main({ children }: PropsWithChildren) {
  return <div className={styles.emptyState}>{children}</div>;
}

function EmptyStateIcon(props: Omit<IconProps, 'color'>) {
  return <Icon {...props} color="text-tertiary" />;
}
function EmptyStateDescription({ children }: PropsWithChildren) {
  return <p className={styles.description}>{children}</p>;
}

function EmptyStateActionButton({ ...props }: ButtonProps) {
  return <Button {...props} />;
}

export const EmptyState = Object.assign(Main, {
  Icon: EmptyStateIcon,
  Description: EmptyStateDescription,
  Action: EmptyStateActionButton,
});
