import { useMutation } from '@tanstack/react-query';
import { postCrewJoin } from '../api/postCrewJoin';

export const usePostCrewJoin = () => {
  return useMutation({
    mutationFn: postCrewJoin,
  });
};
