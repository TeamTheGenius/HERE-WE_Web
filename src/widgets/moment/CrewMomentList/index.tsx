import { MomentType } from '@/entities/moment/model/types';
import temp from '@/shared/assets/temp.jpg';
import { usePagination } from '@/shared/hooks/usePagination';
import { Card } from '@/shared/ui/Card';
import GridContainer from '@/shared/ui/GridContainer';
import Pagination from '@/shared/ui/Pagination';
import styles from './index.module.scss';

const data: MomentType[] = [
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
  {
    crewId: 1,
    date: '2025.01.15 월요일 06:00',
    endDate: '2025.02.20 월요일 06:00',
    file: {
      source: temp,
      fileEnv: 'LOCAL',
      fileId: 1,
    },
    location: '사당역 4번 출구',
    name: '신년파티',
    participantCount: 15,
    capacity: 20,
  },
];

function CrewMomentList() {
  const paginationTools = usePagination(1, 1, 7);
  return (
    <>
      <GridContainer>
        {data.map((moment) => {
          return (
            <Card key={moment.crewId} handleClick={() => {}}>
              <Card.Image src={moment.file?.source || temp} alt="크루 썸네일" />
              <Card.Title>{moment.name}</Card.Title>
              <Card.Detail>{moment.date}</Card.Detail>
              <Card.Detail>{moment.location}</Card.Detail>
              <Card.Metadata>
                참여 {moment.participantCount}/{moment.capacity}명
              </Card.Metadata>
              <Card.Metadata>마감 {moment.endDate}</Card.Metadata>
            </Card>
          );
        })}
      </GridContainer>
      <div className={styles.pagination}>
        <Pagination paginationTools={paginationTools} />
      </div>
    </>
  );
}

export default CrewMomentList;
