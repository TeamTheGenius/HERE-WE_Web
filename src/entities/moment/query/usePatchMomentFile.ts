import { useMutation } from '@tanstack/react-query';
import { patchMomentFile } from '../api/patchMomentFile';

export const usePatchMomentFile = () => {
  return useMutation({
    mutationFn: patchMomentFile,
  });
};
