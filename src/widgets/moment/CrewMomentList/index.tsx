import { usePagination } from '@/shared/hooks/usePagination';
import { Card } from '@/shared/ui/Card';
import GridContainer from '@/shared/ui/GridContainer';
import { Pagination } from '@/shared/ui/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { useCrewMomentListWithFile } from '@/features/moment/query/useCrewMomentListWithFile';
import { useEffect } from 'react';
import { routePaths } from '@/app/routes/path';
import { BadgeProps } from '@/shared/ui/Badge';
import { EmptyState } from '@/shared/ui/EmptyState';

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
  if (crewMomentListData && crewMomentListData.content?.length === 0)
    return (
      <EmptyState>
        <EmptyState.Icon icon="calendar" iconSize="80" />
        <EmptyState.Description>아직 모먼트가 없습니다</EmptyState.Description>
        <EmptyState.Description>첫 모먼트를 만들어보세요!</EmptyState.Description>
      </EmptyState>
    );

  const getTagProps = (isJoined: boolean, isClosed: boolean): BadgeProps => {
    if (isJoined && isClosed) {
      return {
        text: '참여완료',
        variant: 'tertiary',
      };
    }

    if (isJoined && !isClosed) {
      return {
        text: '참여중',
        variant: 'secondary',
      };
    }

    if (!isJoined && isClosed) {
      return {
        text: '마감',
        variant: 'tertiary',
      };
    }

    return {
      text: '신청가능',
      variant: 'primary',
    };
  };

  return (
    <Pagination>
      <Pagination.Content>
        <GridContainer>
          {crewMomentListData?.content?.map((moment) => {
            const { text: tagText, variant: tagVariant } = getTagProps(moment.isJoined, moment.isClosed);
            return (
              <Card key={moment.momentId} handleClick={() => handleClickCard(moment.momentId)}>
                <Card.Image src={moment.file?.source || ''} alt="크루 썸네일" />
                <Card.Tag variant={tagVariant}>{tagText}</Card.Tag>
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
      </Pagination.Content>
      <Pagination.Controller paginationTools={paginationTools} isVisible={crewMomentListData.page.totalPages > 0} />
    </Pagination>
  );
}

export default CrewMomentList;
