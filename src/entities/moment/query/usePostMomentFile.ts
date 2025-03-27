import { useMutation } from '@tanstack/react-query';
import { postMomentFile } from '../api/postMomentFile';

export const usePostMomentFile = () => {
  return useMutation({
    mutationFn: postMomentFile,
  });
};
