import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/landing-page/home';
import SignInPage from '../pages/auth/sign-in';
import RegisterPage from '../pages/auth/register';
import { useReduxAuth } from '../hooks/useReduxAuth';

const LandingPageLayout = React.lazy(() => import('../layout/landing-page-layout'));

type AppRoutesProps = {
  RoutesComponent: React.ComponentType<React.ComponentProps<typeof Routes>>;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ RoutesComponent }) => {
  const { isAuthenticated, user } = useReduxAuth();

  return (
    <RoutesComponent>
      <Route element={<LandingPageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {isAuthenticated && user?.role === 'user' && (
        <Route path="/dashboard" element={<Home />} />
      )}
      {isAuthenticated && user?.role === 'distributor' && (
        <Route path="/distributor" element={<Home />} />
      )}
      {isAuthenticated && user?.role === 'manufacturer' && (
        <Route path="/manufacturer" element={<Home />} />
      )}
      {isAuthenticated && user?.role === 'admin' && (
        <Route path="/admin" element={<Home />} />
      )}
    </RoutesComponent>
  );
};

export default AppRoutes;

