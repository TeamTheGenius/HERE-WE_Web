import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import { routePaths } from './path';
import CenterLayout from '../layouts/CenterLayout';
import Main from '@/pages/MainPage';
import HeaderLayout from '../layouts/HeaderLayout';
import MemberPage from '@/pages/MemberPage';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import MomentPage from '@/pages/MomentPage';
import CrewCreatePage from '@/pages/CrewCreatePage';
import AuthPage from '@/pages/AuthPage';
import MemberJoinPage from '@/pages/MemberJoinPage';
import MomentCreatePage from '@/pages/MomentCreatePage';
import FullLayout from '../layouts/FullLayout';
import MomentPlacePage from '@/pages/MomentPlacePage';
import MomentDetailPage from '@/pages/MomentDetailPage';
import UpcomingMomentsPage from '@/pages/UpcomingMomentsPage';
import MomentEditPage from '@/pages/MomentEditPage';
import HeaderWithNavigationLayout from '../layouts/HeaderWithNavigationLayout';

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />}>
          <Route path={routePaths.signIn} element={<SignInPage />} />
          <Route path={routePaths.signUp} element={<SignUpPage />} />
        </Route>

        <Route path={routePaths.auth} element={<AuthPage />} />
        <Route path={routePaths.memberJoin} element={<MemberJoinPage />} />

        <Route element={<HeaderLayout />}>
          <Route path={routePaths.main} element={<Main />} />
          <Route path={routePaths.createCrew} element={<CrewCreatePage />} />
          <Route path={routePaths.momentCreate.path} element={<MomentCreatePage />} />
          <Route path={routePaths.momentEdit.path} element={<MomentEditPage />} />
          <Route path={routePaths.momentDetail.path} element={<MomentDetailPage />} />
          <Route path={routePaths.upcomingMoment} element={<UpcomingMomentsPage />} />
        </Route>

        <Route element={<HeaderWithNavigationLayout />}>
          <Route path={routePaths.member} element={<MemberPage />} />
          <Route path={routePaths.home} element={<HomePage />} />
          <Route path={routePaths.chat} element={<ChatPage />} />
          <Route path={routePaths.moment} element={<MomentPage />} />
        </Route>

        <Route element={<FullLayout />}>
          <Route path={routePaths.momentPlace.path} element={<MomentPlacePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
