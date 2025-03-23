import { useQueries, useQuery } from '@tanstack/react-query';
import { crewQueries } from './crewQueries';
import { FileType } from '@/shared/types/api';

// 크루와 이미지를 합병하는 커스텀 훅
export const useMyCrewsWithFile = (page: number, size: number) => {
  const { data: crewListData } = useQuery({
    ...crewQueries.myCrewsPagination({ page, size }),
  });

  const fileQueries = useQueries({
    queries: (crewListData?.content || []).map((crew) => ({
      ...crewQueries.crewFile({ crewId: crew.crewId }),
    })),
  });

  // 파일 데이터를 ID로 매핑
  const fileDataMap: Record<number, FileType | undefined> = {};
  crewListData?.content?.forEach((crew, index) => {
    fileDataMap[crew.crewId] = fileQueries[index]?.data;
  });

  // 매핑을 사용하여 content 변환
  const enhancedContent = crewListData?.content?.map((crew) => ({
    ...crew,
    file: fileDataMap[crew.crewId],
  }));

  // 변환된 데이터만 반환
  return {
    data: crewListData
      ? {
          ...crewListData,
          content: enhancedContent || [],
        }
      : undefined,
  };
};
