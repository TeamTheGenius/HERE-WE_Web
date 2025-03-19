import { queryOptions } from '@tanstack/react-query';
import { GetCrewMemberesResponse, getCrewMembers, GetCrewMembersRequest } from '../api/getCrewMembers';

export const crewMemberQueries = {
  allKeys: ['crewMember'] as const,
  crewMembers: ({ page, size, crewId }: GetCrewMembersRequest) =>
    queryOptions<GetCrewMemberesResponse>({
      queryKey: [...crewMemberQueries.allKeys, crewId, 'list', page, size],
      queryFn: () => getCrewMembers({ page, size, crewId }),
    }),
};
