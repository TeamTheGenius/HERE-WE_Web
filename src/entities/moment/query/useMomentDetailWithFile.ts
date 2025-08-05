import { useSuspenseQuery } from '@tanstack/react-query';
import { MomentType } from '../model/types';
import { momentQueries } from './momentQueries';

interface UseMomentDetailWithFileReturn {
  data: MomentType | undefined;
}

// 모먼트와 이미지를 합병하는 커스텀 훅
export const useMomentDetailWithFile = (momentId: number): UseMomentDetailWithFileReturn => {
  const { data: momentData } = useSuspenseQuery({
    ...momentQueries.momentJSON({ momentId }),
  });

  const { data: fileData } = useSuspenseQuery({
    ...momentQueries.momentFile({ momentId }),
  });

  return {
    data: momentData
      ? {
          ...momentData,
          file: fileData,
        }
      : undefined,
  };
};
