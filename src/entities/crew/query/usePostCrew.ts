import { useMutation } from '@tanstack/react-query';
import { postCrew } from '../api/postCrew';

export const usePostCrew = () => {
  return useMutation({
    mutationFn: postCrew,
  });
};
