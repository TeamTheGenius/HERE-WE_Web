import { useQueries, useQuery } from '@tanstack/react-query';
import { crewMemberQueries } from '../../../entities/member/query/memberQueries';
import { userQueries } from '@/entities/user/query/userQueries';
import { FileType } from '@/shared/types/api';

// 크루 멤버와 프로필을 합병하는 커스텀 훅
export const useCrewMembersWithFile = (page: number, size: number, crewId: number) => {
  const { data: crewMembersData } = useQuery({
    ...crewMemberQueries.crewMembersPagination({ page, size, crewId }),
  });

  const fileQueries = useQueries({
    queries: (crewMembersData?.content || []).map((crew) => ({
      ...userQueries.profileFile({ userId: crew.userId }),
    })),
  });
  // 파일 데이터를 ID로 매핑
  const fileDataMap: Record<number, FileType | undefined> = {};
  crewMembersData?.content?.forEach((crew, index) => {
    fileDataMap[crew.userId] = fileQueries[index]?.data;
  });

  // 매핑을 사용하여 content 변환
  const enhancedContent = crewMembersData?.content?.map((crew) => ({
    ...crew,
    file: fileDataMap[crew.userId],
  }));

  // 변환된 데이터만 반환
  return {
    data: crewMembersData
      ? {
          ...crewMembersData,
          content: enhancedContent || [],
        }
      : undefined,
  };
};
