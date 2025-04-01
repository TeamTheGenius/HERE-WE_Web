import ScrollableRow from '@/shared/ui/ScrollableRow';
import { useQuery } from '@tanstack/react-query';
import { momentFeatureQueries } from '../../query/momentFeatureQueries';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';

function MomentPlaceRow() {
  const { momentId } = useParams();
  const { data } = useQuery({ ...momentFeatureQueries.momentPlaces({ momentId: Number(momentId) }) });

  if (!data) return null;

  return (
    <ScrollableRow>
      {data.places.map((place) => (
        <Card key={place.id} size="md" border={true} handleClick={() => {}}>
          <Card.Text>
            <Card.Detail>{place.placeName}</Card.Detail>
            <Card.Metadata>도로명: {place.roadAddressName}</Card.Metadata>
            <Card.Metadata>지번: {place.addressName}</Card.Metadata>
            <Card.Metadata>연락처: {place.phone}</Card.Metadata>
          </Card.Text>
        </Card>
      ))}
    </ScrollableRow>
  );
}

export default MomentPlaceRow;
