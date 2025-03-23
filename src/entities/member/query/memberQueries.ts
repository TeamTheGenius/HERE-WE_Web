import { GetCrewMemberesResponse, getCrewMembers, GetCrewMembersRequest } from '@/features/member/api/getCrewMembers';
import { queryOptions } from '@tanstack/react-query';

export const crewMemberQueries = {
  allKeys: ['crewMember'] as const,
  crewMembers: ({ crewId }: { crewId: number }) => [...crewMemberQueries.allKeys, crewId],
  crewMembersPagination: ({ page, size, crewId }: GetCrewMembersRequest) =>
    queryOptions<GetCrewMemberesResponse>({
      queryKey: [...crewMemberQueries.allKeys, crewId, page, size],
      queryFn: () => getCrewMembers({ page, size, crewId }),
    }),
};
