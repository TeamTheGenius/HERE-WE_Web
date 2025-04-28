import { routePaths } from '@/app/routes/path';
import { postAuth } from '@/features/auth/api/postAuth';
import { SESSION_STORAGE_KEY } from '@/shared/constants/storageKey';
import useUserStore from '@/shared/store/userStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthPage() {
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get('id'));
  const navigate = useNavigate();
  const updateUser = useUserStore((state) => state.update);

  useEffect(() => {
    const requestAuthorization = async () => {
      const { nickname, profileImage } = await postAuth(userId);
      updateUser({ nickname, profileImage });

      const redirectURL = sessionStorage.getItem(SESSION_STORAGE_KEY.REDIRECT_AFTER_OAUTH);
      sessionStorage.removeItem(SESSION_STORAGE_KEY.REDIRECT_AFTER_OAUTH);

      if (redirectURL) navigate(redirectURL);
      else navigate(routePaths.main);
    };
    requestAuthorization();
  }, [userId]);

  return <></>;
}

export default AuthPage;
