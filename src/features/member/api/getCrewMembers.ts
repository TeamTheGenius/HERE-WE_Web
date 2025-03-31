import { privateClient } from '@/shared/api/config';
import { Pagination } from '@/shared/types/api';

export interface GetCrewMembersRequest {
  crewId: number;
  page: number;
  size: number;
}

export interface CrewMember {
  userId: number;
  name: string;
  role: 'LEADER' | 'MEMBER';
  joinedAt: string;
}

export const getCrewMembers = async ({
  crewId,
  page,
  size,
}: GetCrewMembersRequest): Promise<Pagination<CrewMember>> => {
  const { data: response } = await privateClient.get(`/crew/${crewId}/members`, {
    params: {
      page,
      size,
    },
  });
  return {
    content: response.data.content,
    page: response.data.page,
  };
};
