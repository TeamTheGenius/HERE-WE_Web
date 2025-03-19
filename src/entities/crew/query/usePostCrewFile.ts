import { useMutation } from '@tanstack/react-query';
import { postCrewFile } from '../api/postCrewFile';

export const usePostCrewFile = () => {
  return useMutation({
    mutationFn: postCrewFile,
  });
};
