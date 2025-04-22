import { useCrewMembersWithFile } from '@/features/member/query/useCrewMembersWithFile';
import MemberList, { CrewMemberRoleType, CrewMemberType } from '@/features/member/ui/MemberList';
import { usePagination } from '@/shared/hooks/usePagination';
import { Pagination } from '@/shared/ui/Pagination';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteCrewMember } from '@/entities/member/query/useDeleteCrewMember';
import { useModal } from '@/shared/hooks/useModal';
import MemberKickModal from '@/features/member/ui/MemberKickModal';
import { useQuery } from '@tanstack/react-query';
import { crewFeatureQueries } from '@/features/crew/query/crewFeatureQueries';

function MemberListSection() {
  const { crewId } = useParams();
  const paginationTools = usePagination(1, 1, 7);
  const { currentPage, setMaxPage } = paginationTools;
  const { data: crewMemberList } = useCrewMembersWithFile(currentPage - 1, 12, Number(crewId));
  const { data: crewProfile } = useQuery({ ...crewFeatureQueries.myCrewProfile({ crewId: Number(crewId) }) });

  const { mutateAsync } = useDeleteCrewMember();
  const { isOpen, closeModal, openModal } = useModal();
  const [selectedNickname, setSelectedNickname] = useState('');

  const handleKickModalOpen = (nickname: string) => {
    setSelectedNickname(nickname);
    openModal();
  };

  useEffect(() => {
    if (crewMemberList?.page?.totalPages) setMaxPage(crewMemberList.page.totalPages);
  }, [crewMemberList?.page?.totalPages, setMaxPage]);

  const transformedData: CrewMemberType[] =
    crewMemberList?.content.map((member) => ({
      id: member.userId,
      image: member.file?.source || '',
      nickname: member.name,
      role: member.role === 'LEADER' ? ('크루리더' as CrewMemberRoleType) : ('크루원' as CrewMemberRoleType),
      date: member.joinedAt,
    })) || [];

  if (!crewMemberList || !crewProfile) return null;

  const handleKick = async () => {
    await mutateAsync({ nickname: selectedNickname, crewId: Number(crewId) });
    closeModal();
  };

  return (
    <>
      <MemberKickModal isOpen={isOpen} handleClose={closeModal} handleSubmit={handleKick} nickname={selectedNickname} />
      <Pagination>
        <Pagination.Content>
          <MemberList
            data={[...transformedData]}
            isCrewLeader={crewProfile.role === 'LEADER'}
            handleKick={handleKickModalOpen}
          />
        </Pagination.Content>
        <Pagination.Controller paginationTools={paginationTools} isVisible={crewMemberList.page.totalPages > 0} />
      </Pagination>
    </>
  );
}

export default MemberListSection;
