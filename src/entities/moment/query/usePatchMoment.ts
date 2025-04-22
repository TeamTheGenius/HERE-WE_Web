import { useMutation } from '@tanstack/react-query';
import { patchMoment } from '../api/patchMoment';

export const usePatchMoment = (options?: {}) => {
  return useMutation({
    mutationFn: patchMoment,
    throwOnError: false,
    ...options,
  });
};
