import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMomentJoin } from '../api/postMomentJoin';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { momentFeatureQueries } from './momentFeatureQueries';

export const usePostMomentJoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMomentJoin,
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
