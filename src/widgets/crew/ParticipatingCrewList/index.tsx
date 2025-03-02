import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/drawing_1739943673312.png';

const datas = [
  { id: 1, name: 'testtttttttttttttttttttttttttt', image, participants: 5 },
  { id: 2, name: 'test', image, participants: 10 },
  { id: 3, name: 'test', image, participants: 12 },
  { id: 4, name: 'test', image, participants: 20 },
  { id: 5, name: 'test', image, participants: 25 },
  { id: 6, name: 'test', image, participants: 18 },
  { id: 7, name: 'test', image, participants: 21 },
  { id: 8, name: 'test', image, participants: 11 },
  { id: 9, name: 'test', image, participants: 26 },
  { id: 10, name: 'test', image, participants: 12 },
  { id: 11, name: 'test', image, participants: 27 },
  { id: 12, name: 'test', image, participants: 19 },
];

function ParticipatingCrewList() {
  return (
    <>
      {datas.map((data) => {
        return (
          <Card key={data.id}>
            <Card.Image src={image} alt="크루 썸네일" />
            <Card.Title>{data.name}</Card.Title>
            <Card.Detail>크루원 {data.participants}</Card.Detail>
          </Card>
        );
      })}
    </>
  );
}

export default ParticipatingCrewList;
