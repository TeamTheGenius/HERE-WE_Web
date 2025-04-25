import { useMutation } from '@tanstack/react-query';
import { patchCrewFile } from '../api/patchCrewFile';

export const usePatchCrewFile = () => {
  return useMutation({
    mutationFn: patchCrewFile,
  });
};
