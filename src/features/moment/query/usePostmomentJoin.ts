import { useMutation } from '@tanstack/react-query';
import { postMomentJoin } from '../api/postMomentJoin';

export const usePostmomentJoin = () => {
  return useMutation({
    mutationFn: postMomentJoin,
  });
};
