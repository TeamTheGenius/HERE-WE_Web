import { routePaths } from '@/app/routes/path';
import { postAuth } from '@/features/auth/api/postAuth';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthPage() {
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get('id'));
  const navigate = useNavigate();

  useEffect(() => {
    const requestAuthorization = async () => {
      if (userId) await postAuth(userId);
      navigate(routePaths.main);
    };
    requestAuthorization();
  }, [userId]);

  return <></>;
}

export default AuthPage;
