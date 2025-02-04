import { clsx, ClassValue } from 'clsx';

export function cn(...classnames: ClassValue[]): string {
  return clsx(...classnames);
}
