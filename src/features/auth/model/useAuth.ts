export type SocialProvider = 'google' | 'naver' | 'kakao';

export const useAuth = () => {
  const handleSocialSignIn = (variant: SocialProvider) => {
    const API_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${API_URL}/oauth2/authorization/${variant}`;
  };

  return { handleSocialSignIn };
};
