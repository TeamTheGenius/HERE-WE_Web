import { useSuspenseQuery } from '@tanstack/react-query';
import { crewQueries } from './crewQueries';
import { CrewType } from '../model/types';

interface UseCrewWithFileReturn {
  data: CrewType | undefined;
}

// 크루와 이미지를 합병하는 커스텀 훅
export const useCrewWithFile = (crewId: number): UseCrewWithFileReturn => {
  const { data: crewData } = useSuspenseQuery({
    ...crewQueries.crewJSON({ crewId }),
  });

  const { data: fileData } = useSuspenseQuery({
    ...crewQueries.crewFile({ crewId }),
  });

  return {
    data: crewData
      ? {
          ...crewData,
          file: fileData,
        }
      : undefined,
  };
};
