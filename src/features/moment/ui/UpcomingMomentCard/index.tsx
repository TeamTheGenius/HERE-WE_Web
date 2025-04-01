import { Card } from '@/shared/ui/Card';
import { UpcomingMoment } from '../../model/types';
import { formatDDay } from '@/shared/lib/dateFormater';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/routes/path';

interface UpcomingMomentCardProps {
  data: UpcomingMoment;
  size: 'full' | 'md';
}

function UpcomingMomentCard({ data, size }: UpcomingMomentCardProps) {
  const navigate = useNavigate();

  const handleClickCard = (momentId: number, crewId: number) => {
    navigate(routePaths.momentDetail.getPath(momentId, crewId));
  };

  const dDay = formatDDay(new Date(data.meetAt));
  return (
    <Card key={data.momentId} size={size} handleClick={() => handleClickCard(data.momentId, data.crewId)}>
      <Card.Image src={data.file?.source || ''} alt="모먼트트 썸네일" />
      <Card.Tag variant={dDay === 'D-Day' ? 'primary' : 'tertiary'} text={dDay}></Card.Tag>
      <Card.Text>
        <Card.Title>{data.momentName}</Card.Title>
        <Card.Detail>{data.crewName}</Card.Detail>
        <Card.Detail>{data.meetPlaceName}</Card.Detail>
        <Card.Detail>{data.meetAt}</Card.Detail>
      </Card.Text>
    </Card>
  );
}

export default UpcomingMomentCard;
