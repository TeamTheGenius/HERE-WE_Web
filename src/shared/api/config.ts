import axios from 'axios';
import { tokenStorage } from './tokenStorage';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/`;

export const publicClient = axios.create({
  baseURL: API_BASE_URL,
});

export const privateClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

privateClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) config.headers['Authorization'] = accessToken;
  return config;
});

privateClient.interceptors.response.use((response) => {
  const isTokenReissued = response.headers['x-token-reissued'];
  const accessToken = response.headers['authorization'];
  if (isTokenReissued && accessToken) tokenStorage.setAccessToken(accessToken);
  return response;
});
