import { useMutation } from '@tanstack/react-query';
import { patchCrew } from '../api/patchCrew';

export const usePatchCrew = () => {
  return useMutation({
    mutationFn: patchCrew,
  });
};
