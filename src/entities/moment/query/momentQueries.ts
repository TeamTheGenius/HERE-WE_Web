import { queryOptions } from '@tanstack/react-query';
import { getMomentFile, GetMomentFileRequest } from '../api/getMomentFile';
import { getMoment, GetMomentRequest } from '../api/getMoment';

export const momentQueries = {
  allKeys: ['crewMoment'] as const,

  momentJSON: ({ momentId }: GetMomentRequest) =>
    queryOptions({
      queryKey: [...momentQueries.allKeys, 'json', momentId],
      queryFn: () => getMoment({ momentId }),
    }),

  momentFile: ({ momentId }: GetMomentFileRequest) =>
    queryOptions({
      queryKey: [...momentQueries.allKeys, 'file', momentId],
      queryFn: () => getMomentFile({ momentId }),
    }),
};
