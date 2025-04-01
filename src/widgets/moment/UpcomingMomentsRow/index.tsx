import { useUpcomingMomentsWithFile } from '@/features/moment/query/useUpcomingMomentsWithFile';
import { formatDDay } from '@/shared/lib/dateFormater';
import { Card } from '@/shared/ui/Card';
import ScrollableRow from '@/shared/ui/ScrollableRow';

function UpcomingMomentsRow() {
  const { data: upcomingMomentsData } = useUpcomingMomentsWithFile(0, 12);

  if (!upcomingMomentsData) return null;

  return (
    <ScrollableRow>
      {upcomingMomentsData?.content.map((data) => {
        const dDay = formatDDay(new Date(data.meetAt));

        return (
          <Card key={data.momentId} size="md" handleClick={() => {}}>
            <Card.Image src={data.file?.source || ''} alt="크루 썸네일" />
            <Card.Tag
              variant={dDay === 'D-Day' ? 'primary' : 'tertiary'}
              text={formatDDay(new Date(data.meetAt))}
            ></Card.Tag>
            <Card.Text>
              <Card.Title>{data.momentName}</Card.Title>
              <Card.Detail>{data.crewName}</Card.Detail>
              <Card.Detail>{data.meetPlaceName}</Card.Detail>
              <Card.Detail>{data.meetAt}</Card.Detail>
            </Card.Text>
          </Card>
        );
      })}
    </ScrollableRow>
  );
}

export default UpcomingMomentsRow;
