import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import { routePaths } from './path';
import CenterLayout from '../layouts/CenterLayout';
import Main from '@/pages/MainPage';

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />}>
          <Route path={routePaths.signIn} element={<SignInPage />} />
          <Route path={routePaths.signUp} element={<SignUpPage />} />
        </Route>
        <Route path={routePaths.main} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
