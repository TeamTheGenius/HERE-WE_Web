import { create } from 'zustand';

// 간단한 ID 생성 함수
const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
// 기본 토스트 지속 시간 (ms)
const DEFAULT_TOAST_DURATION = 4000;

export type ToastType = 'success' | 'error' | 'warning' | 'action';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  allowMultiple?: boolean;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const {
      title = '',
      message,
      type,
      duration = DEFAULT_TOAST_DURATION,
      allowMultiple = false,
      actionLabel,
      onAction,
    } = toast;

    const newToast: Toast = {
      id: generateId(),
      title,
      message,
      type,
      actionLabel,
      onAction,
    };

    set((state) => ({
      toasts: allowMultiple ? [...state.toasts, newToast] : [newToast],
    }));

    if (duration !== Infinity) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== newToast.id),
        }));
      }, duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
