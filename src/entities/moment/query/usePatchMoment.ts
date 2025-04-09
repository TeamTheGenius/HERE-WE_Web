import { useMutation } from '@tanstack/react-query';
import { patchMoment } from '../api/patchMoment';

export const usePatchMoment = () => {
  return useMutation({
    mutationFn: patchMoment,
  });
};
