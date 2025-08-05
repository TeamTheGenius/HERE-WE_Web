import { useUpcomingMomentsWithFile } from '@/features/moment/query/useUpcomingMomentsWithFile';
import UpcomingMomentCard from '@/features/moment/ui/UpcomingMomentCard';
import { EmptyState } from '@/shared/ui/EmptyState';
import ScrollableRow from '@/shared/ui/ScrollableRow';

function UpcomingMomentsRow() {
  const { data: upcomingMomentsData } = useUpcomingMomentsWithFile(0, 12);

  if (!upcomingMomentsData?.content.length)
    return (
      <EmptyState>
        <EmptyState.Icon icon="calendar" iconSize="80" />
        <EmptyState.Description>다가오는 모먼트가 없습니다</EmptyState.Description>
        <EmptyState.Description>크루의 모먼트에 참여해보세요!</EmptyState.Description>
      </EmptyState>
    );

  return (
    <ScrollableRow>
      {upcomingMomentsData?.content.map((data) => <UpcomingMomentCard key={data.momentId} size="md" data={data} />)}
    </ScrollableRow>
  );
}

export default UpcomingMomentsRow;
