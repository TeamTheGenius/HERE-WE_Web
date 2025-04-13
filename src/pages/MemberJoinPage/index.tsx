import { usePostCrewJoin } from '@/entities/member/query/usePostCrewJoin';
import { useAuth } from '@/features/auth/model/useAuth';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function MemberJoinPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const oauth = searchParams.get('oauth') as 'naver' | 'google' | 'kakao';
  const navigate = useNavigate();
  const { mutateAsync } = usePostCrewJoin();
  const { handleSocialSignIn } = useAuth();

  useEffect(() => {
    const joinCrew = async () => {
      try {
        const { crewId } = await mutateAsync({ token: token || '' });
        navigate(`/home/${crewId}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error.response?.data?.code === 'JWT_NOT_FOUND_IN_COOKIE' ||
            error.response?.data?.code === 'TOKEN_HIJACKED'
          ) {
            // 인증 완료 후 리다이렉트 할 현재 url 저장
            const redirectPath = window.location.pathname + window.location.search;
            sessionStorage.setItem('redirectAfterOAuth', redirectPath);

            // oauth에 맞는 경로로 인증 리다이렉트
            handleSocialSignIn(oauth);
          }
        }
      }
    };
    joinCrew();
  }, [token, mutateAsync, oauth]);

  return <></>;
}

export default MemberJoinPage;
