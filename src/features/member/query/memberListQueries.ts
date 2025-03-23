import { queryOptions } from '@tanstack/react-query';
import { GetCrewMemberesResponse, getCrewMembers, GetCrewMembersRequest } from '../api/getCrewMembers';
import { crewMemberQueries } from '@/entities/member/query/memberQueries';

export const memberListQueries = {
  crewMembersPagination: ({ page, size, crewId }: GetCrewMembersRequest) =>
    queryOptions<GetCrewMemberesResponse>({
      queryKey: [...crewMemberQueries.allKeys, crewId, page, size],
      queryFn: () => getCrewMembers({ page, size, crewId }),
    }),
};
