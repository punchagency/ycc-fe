import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/landing-page/home/home';
import SignInPage from '../pages/auth/sign-in';
import RegisterPage from '../pages/auth/register';
import UserDashboardLayout from '../layout/user-dashboard-layout';
import UserDashboardHome from '../pages/dashboard/user-dashboard-home';
import { useReduxAuth } from '../hooks/useReduxAuth';

type AppRoutesProps = {
  RoutesComponent: React.ComponentType<React.ComponentProps<typeof Routes>>;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ RoutesComponent }) => {
  const { isAuthenticated, user } = useReduxAuth();
  const userRole = user?.role ?? null;

  const roleHome: Record<string, string> = {
    user: '/dashboard',
    distributor: '/distributor',
    manufacturer: '/manufacturer',
    admin: '/admin',
  };

  const authenticatedHome = roleHome[userRole ?? ''] ?? '/dashboard';

  return (
    <RoutesComponent>
      <Route path='/' element={<Home />} />

      {!isAuthenticated ? (
        <>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/get-started' element={<RegisterPage />} />
        </>
      ) : (
        <>
          <Route
            path='/login'
            element={<Navigate to={authenticatedHome} replace />}
          />
          <Route
            path='/get-started'
            element={<Navigate to={authenticatedHome} replace />}
          />
        </>
      )}

      {isAuthenticated && userRole === 'user' && (
        <Route element={<UserDashboardLayout />}>
          <Route path='/dashboard' element={<UserDashboardHome />} />
        </Route>
      )}

      {isAuthenticated && userRole === 'distributor' && (
        <Route path='/distributor' element={<Home />} />
      )}
      {isAuthenticated && userRole === 'manufacturer' && (
        <Route path='/manufacturer' element={<Home />} />
      )}
      {isAuthenticated && userRole === 'admin' && (
        <Route path='/admin' element={<Home />} />
      )}

      <Route
        path='*'
        element={
          <Navigate to={isAuthenticated ? authenticatedHome : '/'} replace />
        }
      />
    </RoutesComponent>
  );
};

export default AppRoutes;
