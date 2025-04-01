import image from '@/shared/assets/temp.jpg';
import { Card } from '@/shared/ui/Card';

const datas = [
  {
    id: 1,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 2,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 3,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 4,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 5,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 6,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 7,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
  {
    id: 8,
    crew: 'TeamTheGenius',
    name: '신년파티!!!!',
    image,
    participants: 5,
    date: '2025.03.05 월요일 오전 06:00',
    place: '사당역 4번 출구',
  },
];

function parseKoreanDate(koreanDateStr: string) {
  const regex = /(\d{4})\.(\d{2})\.(\d{2}) [^ ]* (오전|오후) (\d{2}):(\d{2})/;
  const match = koreanDateStr.match(regex);

  if (!match) {
    throw new Error(`Invalid date format: ${koreanDateStr}`);
  }

  let [, year, month, day, meridian, hour, minute] = match;
  let h = parseInt(hour, 10);
  const m = parseInt(minute, 10);

  if (meridian === '오후' && h !== 12) h += 12;
  if (meridian === '오전' && h === 12) h = 0;

  return new Date(`${year}-${month}-${day}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
}

function getDDayNumber(targetDateStr: string) {
  const targetDate = parseKoreanDate(targetDateStr);
  const now = new Date();

  targetDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function UpcomingMomentList() {
  return (
    <>
      {datas.map((data) => {
        return (
          <Card key={data.id} size="md" handleClick={() => {}}>
            <Card.Image src={image} alt="크루 썸네일" />
            <Card.Tag variant="tertiary" text={`D-${getDDayNumber(data.date)}`}></Card.Tag>
            <Card.Text>
              <Card.Title>{data.crew}</Card.Title>
              <Card.Detail>{data.name}</Card.Detail>
              <Card.Detail>{data.date}</Card.Detail>
              <Card.Detail>{data.place}</Card.Detail>
            </Card.Text>
          </Card>
        );
      })}
    </>
  );
}

export default UpcomingMomentList;
