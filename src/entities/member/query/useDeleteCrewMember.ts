import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCrewMember } from '../api/deleteCrewMember';
import { crewMemberQueries } from '@/entities/member/query/memberQueries';

export const useDeleteCrewMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCrewMember,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: [...crewMemberQueries.allKeys, variables.crewId] });
    },
  });
};
