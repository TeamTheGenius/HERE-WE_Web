import { useMutation } from '@tanstack/react-query';
import { postMomentFile } from '../api/postMomentFile';

export const usePostMomentFile = (options?: {}) => {
  return useMutation({
    mutationFn: postMomentFile,
    ...options,
  });
};
