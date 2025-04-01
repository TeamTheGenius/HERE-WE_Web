import temp from '@/shared/assets/temp.jpg';
import { usePagination } from '@/shared/hooks/usePagination';
import { Card } from '@/shared/ui/Card';
import GridContainer from '@/shared/ui/GridContainer';
import Pagination from '@/shared/ui/Pagination';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useCrewMomentListWithFile } from '@/features/moment/hook/useCrewMomentListWithFile';
import { useEffect } from 'react';
import { routePaths } from '@/app/routes/path';

function CrewMomentList() {
  const { crewId } = useParams();
  const navigate = useNavigate();
  const paginationTools = usePagination(1, 1, 7);
  const { currentPage, setMaxPage } = paginationTools;
  const { data: crewMomentListData } = useCrewMomentListWithFile(currentPage - 1, 12, Number(crewId));

  useEffect(() => {
    if (crewMomentListData?.page?.totalPages) setMaxPage(crewMomentListData.page.totalPages);
  }, [crewMomentListData?.page?.totalPages, setMaxPage]);

  const handleClickCard = (momentId: number) => {
    navigate(routePaths.momentDetail.getPath(Number(crewId), momentId));
  };

  if (!crewMomentListData) return null;
  const { content } = crewMomentListData;

  const statusMap = {
    참여중: 'primary',
    참여가능: 'secondary',
    마감: 'tertiary',
  } as const;

  return (
    <>
      <GridContainer>
        {content.map((moment) => {
          return (
            <Card key={moment.momentId} handleClick={() => handleClickCard(moment.momentId)}>
              <Card.Image src={moment.file?.source || temp} alt="크루 썸네일" />
              <Card.Tag variant={statusMap[moment.status]}>{moment.status}</Card.Tag>
              <Card.Text>
                <Card.Title>{moment.name}</Card.Title>
                <Card.Detail>{moment.meetAt}</Card.Detail>
                <Card.Detail>{moment.meetingPlaceName}</Card.Detail>
                <Card.Metadata>
                  참여 {moment.participantCount}/{moment.capacity}명
                </Card.Metadata>
                <Card.Metadata>마감 {moment.closedAt}</Card.Metadata>
              </Card.Text>
            </Card>
          );
        })}
      </GridContainer>
      {crewMomentListData.page.totalPages > 0 && (
        <div className={styles.pagination}>
          <Pagination paginationTools={paginationTools} />
        </div>
      )}
    </>
  );
}

export default CrewMomentList;
