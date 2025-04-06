import { useMutation, useQueryClient } from '@tanstack/react-query';
import { momentFeatureQueries } from './momentFeatureQueries';
import { postMomentPlace } from '../api/postMomentPlace';

export const usePostMomentPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMomentPlace,
    onSuccess: async (_, variables) => {
      const momentPlaceKey = momentFeatureQueries.momentPlaces({ momentId: variables.momentId }).queryKey;
      await queryClient.invalidateQueries({ queryKey: momentPlaceKey });
    },
  });
};
