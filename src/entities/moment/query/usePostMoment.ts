import { useMutation } from '@tanstack/react-query';
import { postMoment } from '../api/postMoment';

export const usePostMoment = () => {
  return useMutation({
    mutationFn: postMoment,
  });
};
