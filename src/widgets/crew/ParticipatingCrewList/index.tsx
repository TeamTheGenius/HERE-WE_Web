import { Card } from '@/shared/ui/Card';
import { usePagination } from '@/shared/hooks/usePagination';
import { Pagination } from '@/shared/ui/Pagination';
import GridContainer from '@/shared/ui/GridContainer';
import { useEffect } from 'react';
import { useMyCrewsWithFile } from '@/features/crew/hook/useMyCrewsWithFile';
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
    <Pagination>
      <Pagination.Content>
        <GridContainer>
          {content.map((crew) => {
            return (
              <Card key={crew.crewId} handleClick={() => handleClickCard(crew.crewId)}>
                <Card.Image src={crew.file?.source || temp} alt="크루 썸네일" />
                <Card.Text>
                  <Card.Title>{crew.name}</Card.Title>
                  <Card.Detail>크루원 {crew.participantCount}</Card.Detail>
                </Card.Text>
              </Card>
            );
          })}
        </GridContainer>
      </Pagination.Content>
      <Pagination.Controller paginationTools={paginationTools} isVisible={crewListData.page.totalPages > 0} />
    </Pagination>
  );
}

export default ParticipatingCrewList;
