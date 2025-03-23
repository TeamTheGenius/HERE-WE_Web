import { useMutation } from '@tanstack/react-query';
import { postCrewInvite } from '../api/postCrewInvite';

export const usePostCrewInvite = () => {
  return useMutation({
    mutationFn: postCrewInvite,
  });
};
