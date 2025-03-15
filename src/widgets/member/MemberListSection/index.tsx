import MemberList from '@/features/member/ui/MemberList';
import temp from '@/shared/assets/temp.jpg';

const data = [
  { id: 1, image: temp, nickname: '으아앙아아아아악아아아아아아아아아아', role: '크루리더', date: '2024.01.01' },
  { id: 2, image: temp, nickname: '으아앙', role: '크루원', date: '2024.01.01' },
  { id: 3, image: temp, nickname: '으아', role: '크루원', date: '2024.01.01' },
] as const;

function MemberListSection() {
  return <MemberList data={[...data]} isCrewLeader={true} />;
}

export default MemberListSection;
