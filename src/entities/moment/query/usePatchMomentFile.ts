import { useMutation } from '@tanstack/react-query';
import { patchMomentFile } from '../api/patchMomentFile';

export const usePatchMomentFile = (options?: {}) => {
  return useMutation({
    mutationFn: patchMomentFile,
    throwOnError: false,
    ...options,
  });
};
