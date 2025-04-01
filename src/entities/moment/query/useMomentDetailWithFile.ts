import { useQuery } from '@tanstack/react-query';
import { MomentType } from '../model/types';
import { momentQueries } from './momentQueries';

interface UseMomentDetailWithFileReturn {
  data: MomentType | undefined;
}

// 모먼트와 이미지를 합병하는 커스텀 훅
export const useMomentDetailWithFile = (momentId: number): UseMomentDetailWithFileReturn => {
  const { data: momentData } = useQuery({
    ...momentQueries.momentJSON({ momentId }),
  });

  const { data: fileData } = useQuery({
    ...momentQueries.momentFile({ momentId }),
    enabled: !!momentData,
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
