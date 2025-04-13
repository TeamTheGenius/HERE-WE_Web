import { useUpcomingMomentsWithFile } from '@/features/moment/query/useUpcomingMomentsWithFile';
import UpcomingMomentCard from '@/features/moment/ui/UpcomingMomentCard';
import { usePagination } from '@/shared/hooks/usePagination';
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

  if (!upcomingMomentsData) return null;
  const { content } = upcomingMomentsData;

  return (
    <TitledLayout>
      <TitledLayout.Title>다가오는 모먼트</TitledLayout.Title>
      <TitledLayout.Content>
        <Pagination>
          <Pagination.Content>
            <GridContainer>
              {content.map((moment) => (
                <UpcomingMomentCard size="full" data={moment} />
              ))}
            </GridContainer>
          </Pagination.Content>
          <Pagination.Controller
            paginationTools={paginationTools}
            isVisible={upcomingMomentsData.page.totalPages > 0}
          ></Pagination.Controller>
        </Pagination>
      </TitledLayout.Content>
    </TitledLayout>
  );
}

export default UpcomingMomentsPage;
