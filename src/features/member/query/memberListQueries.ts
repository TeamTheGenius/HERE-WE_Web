import { queryOptions } from '@tanstack/react-query';
import { CrewMember, getCrewMembers, GetCrewMembersRequest } from '../api/getCrewMembers';
import { crewMemberQueries } from '@/entities/member/query/memberQueries';
import { Pagination } from '@/shared/types/api';

export const memberListQueries = {
  crewMembersPagination: ({ page, size, crewId }: GetCrewMembersRequest) =>
    queryOptions<Pagination<CrewMember>>({
      queryKey: [...crewMemberQueries.allKeys, crewId, page, size],
      queryFn: () => getCrewMembers({ page, size, crewId }),
    }),
};
