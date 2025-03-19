import { privateClient } from '@/shared/api/config';

export interface GetMyCrewListRequest {
  size: number;
  page: number;
}

export interface GetMyCrewListResponse {
  content: Crew[];
  page: Page;
}

export interface Page {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}

export interface Crew {
  crewId: number;
  name: string;
  participantCount: number;
}

export const getMyCrewList = async ({ size, page }: GetMyCrewListRequest): Promise<GetMyCrewListResponse> => {
  const { data: response } = await privateClient.get('/crew/my', {
    params: {
      page: page,
      size: size,
    },
  });

  return {
    content: response.data.content,
    page: response.data.page,
  };
};
