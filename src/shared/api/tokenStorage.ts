import { AxiosHeaderValue } from 'axios';

const createTokenStorage = () => {
  let accessToken: AxiosHeaderValue = null;

  const setAccessToken = (token: AxiosHeaderValue) => (accessToken = token);

  const getAccessToken = () => accessToken;

  const clearAccessToken = () => (accessToken = null);

  return {
    setAccessToken,
    getAccessToken,
    clearAccessToken,
  };
};

export const tokenStorage = createTokenStorage();
