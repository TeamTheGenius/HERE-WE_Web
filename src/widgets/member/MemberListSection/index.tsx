import { useCrewMembersWithFile } from '@/features/member/query/useCrewMembersWithFile';
import MemberList, { CrewMemberRoleType, CrewMemberType } from '@/features/member/ui/MemberList';
import temp from '@/shared/assets/temp.jpg';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { usePagination } from '@/shared/hooks/usePagination';
import Pagination from '@/shared/ui/Pagination';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

function MemberListSection() {
  const { crewId } = useParams();
  const paginationTools = usePagination(1, 1, 7);
  const { currentPage, setMaxPage } = paginationTools;
  const { data: crewMemberList } = useCrewMembersWithFile(currentPage - 1, 12, Number(crewId));

  useEffect(() => {
    if (crewMemberList?.page?.totalPages) setMaxPage(crewMemberList.page.totalPages);
  }, [crewMemberList?.page?.totalPages, setMaxPage]);

  const transformedData: CrewMemberType[] =
    crewMemberList?.content.map((member) => ({
      id: member.userId,
      image: formatImageSource(member.file?.fileEnv, member.file?.source || '') || temp,
      nickname: member.name,
      role: member.role === 'LEADER' ? '크루리더' : ('크루원' as CrewMemberRoleType),
      date: member.joinedAt,
    })) || [];

  if (!crewMemberList) return null;

  return (
    <>
      <MemberList data={[...transformedData]} isCrewLeader={true} />
      {crewMemberList.page.totalPages > 0 && (
        <div className={styles.pagination}>
          <Pagination paginationTools={paginationTools} />
        </div>
      )}
    </>
  );
}

export default MemberListSection;
