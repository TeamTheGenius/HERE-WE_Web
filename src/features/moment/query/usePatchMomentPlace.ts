import { useMutation, useQueryClient } from '@tanstack/react-query';
import { momentFeatureQueries } from './momentFeatureQueries';
import { patchMomentPlace } from '../api/patchMomentPlace';

export const usePatchMomentPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMomentPlace,
    onSuccess: async (_, variables) => {
      const momentPlaceKey = momentFeatureQueries.momentPlaces({ momentId: variables.momentId }).queryKey;
      await queryClient.invalidateQueries({ queryKey: momentPlaceKey });
    },
  });
};
