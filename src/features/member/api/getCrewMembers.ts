import { privateClient } from '@/shared/api/config';

export interface GetCrewMembersRequest {
  crewId: number;
  page: number;
  size: number;
}

export interface GetCrewMemberesResponse {
  content: CrewMember[];
  page: Page;
}

export interface Page {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}

interface CrewMember {
  userId: number;
  name: string;
  role: 'LEADER' | 'MEMBER';
  joinedAt: string;
}

export const getCrewMembers = async ({
  crewId,
  page,
  size,
}: GetCrewMembersRequest): Promise<GetCrewMemberesResponse> => {
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
