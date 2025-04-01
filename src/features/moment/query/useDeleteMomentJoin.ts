import { useMutation } from '@tanstack/react-query';
import { deleteMomentJoin } from '../api/deleteMomentJoin';

export const useDeleteMomentJoin = () => {
  return useMutation({
    mutationFn: deleteMomentJoin,
  });
};
