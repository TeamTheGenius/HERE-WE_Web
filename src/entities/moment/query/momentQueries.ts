import { queryOptions } from '@tanstack/react-query';
import { getMomentFile, GetMomentFileRequest } from '../api/getMomentFile';

export const momentQueries = {
  allKeys: ['crewMoment'] as const,

  momentFile: ({ momentId }: GetMomentFileRequest) =>
    queryOptions({
      queryKey: [...momentQueries.allKeys, 'file', momentId],
      queryFn: () => getMomentFile({ momentId }),
    }),
};
