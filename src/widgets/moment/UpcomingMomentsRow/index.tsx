import { useUpcomingMomentsWithFile } from '@/features/moment/query/useUpcomingMomentsWithFile';
import UpcomingMomentCard from '@/features/moment/ui/UpcomingMomentCard';
import ScrollableRow from '@/shared/ui/ScrollableRow';

function UpcomingMomentsRow() {
  const { data: upcomingMomentsData } = useUpcomingMomentsWithFile(0, 12);

  if (!upcomingMomentsData) return null;

  return (
    <ScrollableRow>
      {upcomingMomentsData?.content.map((data) => <UpcomingMomentCard key={data.momentId} size="md" data={data} />)}
    </ScrollableRow>
  );
}

export default UpcomingMomentsRow;
