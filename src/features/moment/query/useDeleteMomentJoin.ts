import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMomentJoin } from '../api/deleteMomentJoin';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { momentFeatureQueries } from './momentFeatureQueries';

export const useDeleteMomentJoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMomentJoin,
    onSuccess: async (_, variables) => {
      const jsonKey = momentQueries.momentJSON({ momentId: variables.momentId }).queryKey;
      const jsonListKeys = momentFeatureQueries.allListKeys;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: jsonKey }),
        queryClient.invalidateQueries({ queryKey: jsonListKeys }),
      ]);
    },
  });
};
