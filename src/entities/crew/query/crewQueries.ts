import { queryOptions } from '@tanstack/react-query';
import { getCrewFile, GetCrewFileRequest } from '@/entities/crew/api/getCrewFile';
import { getCrew, GetCrewRequest } from '../api/getCrew';

export const crewQueries = {
  allKeys: ['crew'] as const,

  crewFile: ({ crewId }: GetCrewFileRequest) =>
    queryOptions({
      queryKey: [...crewQueries.allKeys, 'file', crewId],
      queryFn: () => getCrewFile({ crewId }),
    }),

  crewJSON: ({ crewId }: GetCrewRequest) =>
    queryOptions({
      queryKey: [...crewQueries.allKeys, 'json', crewId],
      queryFn: () => getCrew({ crewId }),
    }),
};
