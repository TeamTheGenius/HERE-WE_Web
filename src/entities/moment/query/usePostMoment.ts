import { useMutation } from '@tanstack/react-query';
import { postMoment } from '../api/postMoment';

export const usePostMoment = (options?: {}) => {
  return useMutation({
    mutationFn: postMoment,
    ...options,
  });
};
