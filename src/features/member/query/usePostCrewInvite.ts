import { useMutation } from '@tanstack/react-query';
import { postCrewInvite } from '../api/postCrewInvite';

export const usePostCrewInvite = (options = {}) => {
  return useMutation({
    mutationFn: postCrewInvite,
    throwOnError: false,
    ...options,
  });
};
