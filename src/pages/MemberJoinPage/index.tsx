import { routePaths } from '@/app/routes/path';
import { usePostCrewJoin } from '@/entities/member/query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function MemberJoinPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { mutateAsync } = usePostCrewJoin();

  useEffect(() => {
    const joinCrew = async () => {
      await mutateAsync({ token: token || '' });
      navigate(routePaths.main);
    };
    joinCrew();
  }, [token, mutateAsync]);

  return <></>;
}

export default MemberJoinPage;
