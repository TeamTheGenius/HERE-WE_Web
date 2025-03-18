import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/temp.jpg';
import { usePagination } from '@/shared/hooks/usePagination';
import Pagination from '@/shared/ui/Pagination';
import styles from './index.module.scss';
import GridContainer from '@/shared/ui/GridContainer';

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
  { id: 13, name: 'test', image, participants: 27 },
  { id: 14, name: 'test', image, participants: 19 },
];

function ParticipatingCrewList() {
  const paginationTools = usePagination(1, 15);

  return (
    <div className={styles.crewList}>
      <GridContainer>
        {datas.map((data) => {
          return (
            <Card key={data.id}>
              <Card.Image src={data.image} alt="크루 썸네일" />
              <Card.Title>{data.name}</Card.Title>
              <Card.Detail>크루원 {data.participants}</Card.Detail>
            </Card>
          );
        })}
      </GridContainer>
      <div className={styles.crewListPagination}>
        <Pagination paginationTools={paginationTools} />
      </div>
    </div>
  );
}

export default ParticipatingCrewList;
