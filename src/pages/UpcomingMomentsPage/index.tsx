import { useUpcomingMomentsWithFile } from '@/features/moment/query/useUpcomingMomentsWithFile';
import UpcomingMomentCard from '@/features/moment/ui/UpcomingMomentCard';
import { usePagination } from '@/shared/hooks/usePagination';
import { EmptyState } from '@/shared/ui/EmptyState';
import GridContainer from '@/shared/ui/GridContainer';
import { Pagination } from '@/shared/ui/Pagination';
import { TitledLayout } from '@/shared/ui/TitledLayout';
import { useEffect } from 'react';

function UpcomingMomentsPage() {
  const paginationTools = usePagination(1, 1, 7);
  const { currentPage, setMaxPage } = paginationTools;
  const { data: upcomingMomentsData } = useUpcomingMomentsWithFile(currentPage - 1, 12);

  useEffect(() => {
    if (upcomingMomentsData?.page?.totalPages) setMaxPage(upcomingMomentsData.page.totalPages);
  }, [upcomingMomentsData?.page?.totalPages, setMaxPage]);

  return (
    <TitledLayout>
      <TitledLayout.Title>다가오는 모먼트</TitledLayout.Title>
      <TitledLayout.Content>
        {(!upcomingMomentsData || !upcomingMomentsData?.content.length) && (
          <EmptyState>
            <EmptyState.Icon icon="calendar" iconSize="80" />
            <EmptyState.Description>다가오는 모먼트가 없습니다</EmptyState.Description>
            <EmptyState.Description>크루의 모먼트에 참여해보세요!</EmptyState.Description>
          </EmptyState>
        )}
        <Pagination>
          <Pagination.Content>
            <GridContainer>
              {upcomingMomentsData?.content.map((moment) => (
                <UpcomingMomentCard key={moment.momentId} size="full" data={moment} />
              ))}
            </GridContainer>
          </Pagination.Content>
          <Pagination.Controller
            paginationTools={paginationTools}
            isVisible={(upcomingMomentsData?.page?.totalPages ?? 0) > 0}
          ></Pagination.Controller>
        </Pagination>
      </TitledLayout.Content>
    </TitledLayout>
  );
}

export default UpcomingMomentsPage;
