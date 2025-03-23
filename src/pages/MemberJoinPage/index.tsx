import { usePostCrewJoin } from '@/entities/member/query/usePostCrewJoin';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function MemberJoinPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { mutateAsync } = usePostCrewJoin();

  useEffect(() => {
    const joinCrew = async () => {
      const { crewId } = await mutateAsync({ token: token || '' });
      navigate(`/home/${crewId}`);
    };
    joinCrew();
  }, [token, mutateAsync]);

  return <></>;
}

export default MemberJoinPage;
