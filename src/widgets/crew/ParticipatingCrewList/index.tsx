import { Card } from '@/shared/ui/Card';
import { usePagination } from '@/shared/hooks/usePagination';
import Pagination from '@/shared/ui/Pagination';
import styles from './index.module.scss';
import GridContainer from '@/shared/ui/GridContainer';
import { useEffect } from 'react';
import { useMyCrewsWithFile } from '@/entities/crew/query/useMyCrewsWithFile';
import temp from '@/shared/assets/temp.jpg';
import { useNavigate } from 'react-router-dom';

function ParticipatingCrewList() {
  const navigate = useNavigate();
  const paginationTools = usePagination(1, 1, 7);
  const { currentPage, setMaxPage } = paginationTools;
  const { data: crewListData } = useMyCrewsWithFile(currentPage - 1, 12);

  useEffect(() => {
    if (crewListData?.page?.totalPages) setMaxPage(crewListData.page.totalPages);
  }, [crewListData?.page?.totalPages, setMaxPage]);

  const handleClickCard = (crewId: number) => {
    navigate(`/home/${crewId}`);
  };

  if (!crewListData) return null;
  const { content } = crewListData;

  return (
    <div className={styles.crewList}>
      <GridContainer>
        {content.map((crew) => {
          return (
            <Card key={crew.crewId} handleClick={() => handleClickCard(crew.crewId)}>
              <Card.Image src={crew.file?.source || temp} alt="크루 썸네일" />
              <Card.Title>{crew.name}</Card.Title>
              <Card.Detail>크루원 {crew.participantCount}</Card.Detail>
            </Card>
          );
        })}
      </GridContainer>
      {crewListData.page.totalPages > 0 && (
        <div className={styles.crewListPagination}>
          <Pagination paginationTools={paginationTools} />
        </div>
      )}
    </div>
  );
}

export default ParticipatingCrewList;
