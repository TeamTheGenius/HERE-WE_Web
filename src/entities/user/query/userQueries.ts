import { queryOptions } from '@tanstack/react-query';
import { getProfileFile, GetProfileFileRequest } from '../api/getProfileFile';

export const userQueries = {
  allKeys: ['user'] as const,
  profileFile: ({ userId }: GetProfileFileRequest) =>
    queryOptions({
      queryKey: [...userQueries.allKeys, 'file', userId],
      queryFn: () => getProfileFile({ userId }),
    }),
};
