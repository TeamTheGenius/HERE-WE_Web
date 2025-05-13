import { postAuthReissue } from '@/features/auth/api/postAuthReissue';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function PrivatePage() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [uncaughtError, setUncaughtError] = useState<unknown | null>(null);

  useEffect(() => {
    const reissue = async () => {
      try {
        await postAuthReissue();
        setIsAuthChecked(true);
      } catch (error) {
        setUncaughtError(error);
      }
    };

    reissue();
  }, []);

  if (uncaughtError) throw uncaughtError;
  if (!isAuthChecked) return null;

  return <Outlet />;
}

export default PrivatePage;
