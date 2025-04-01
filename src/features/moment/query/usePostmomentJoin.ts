import { useMutation } from '@tanstack/react-query';
import { postMomentJoin } from '../api/postMomentJoin';

export const usePostMomentJoin = () => {
  return useMutation({
    mutationFn: postMomentJoin,
  });
};
