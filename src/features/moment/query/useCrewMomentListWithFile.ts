import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { momentFeatureQueries } from './momentFeatureQueries';
import { momentQueries } from '@/entities/moment/query/momentQueries';
import { FileType } from '@/shared/types/api';

// 모먼트와 이미지를 합병하는 커스텀 훅
export const useCrewMomentListWithFile = (page: number, size: number, crewId: number) => {
  const { data: momentListData } = useSuspenseQuery({
    ...momentFeatureQueries.crewMomentPaginationJSON({ page, size, crewId }),
  });

  const fileQueries = useSuspenseQueries({
    queries: (momentListData?.content || []).map((crew) => ({
      ...momentQueries.momentFile({ momentId: crew.momentId }),
    })),
  });

  // 파일 데이터를 ID로 매핑
  const fileDataMap: Record<number, FileType | undefined> = {};
  momentListData?.content?.forEach((moment, index) => {
    fileDataMap[moment.momentId] = fileQueries[index]?.data;
  });

  // 매핑을 사용하여 content 변환
  const enhancedContent = momentListData?.content?.map((moment) => ({
    ...moment,
    file: fileDataMap[moment.momentId],
  }));

  // 변환된 데이터만 반환
  return {
    data: momentListData
      ? {
          ...momentListData,
          content: enhancedContent || [],
        }
      : undefined,
  };
};
