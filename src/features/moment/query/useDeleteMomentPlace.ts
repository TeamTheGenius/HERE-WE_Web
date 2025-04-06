import { useMutation, useQueryClient } from '@tanstack/react-query';
import { momentFeatureQueries } from './momentFeatureQueries';
import { deleteMomentPlace } from '../api/deleteMomentPlace';

export const useDeleteMomentPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMomentPlace,
    onSuccess: async (_, variables) => {
      const momentPlaceKey = momentFeatureQueries.momentPlaces({ momentId: variables.momentId }).queryKey;
      await queryClient.invalidateQueries({ queryKey: momentPlaceKey });
    },
  });
};
