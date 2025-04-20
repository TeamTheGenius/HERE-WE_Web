import { useToastStore } from '../store/toastStore';

export const useToasts = () => useToastStore((state) => state.toasts);
export const useAddToast = () => useToastStore((state) => state.addToast);
export const useRemoveToast = () => useToastStore((state) => state.removeToast);
