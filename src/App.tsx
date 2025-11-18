import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { setSentryUser } from './config/sentry';
import Session from './utils/Session';
import type { IUser } from './types/auth.type';
import AppRoutes from './routes';

// Lazy loaded components (merged both sides)
const LandingPageLayout = lazy(() => import('./layout/landing-page-layout'));

const Home = lazy(() => import('./pages/landing-page/home/home'));
const VendorAndServices = lazy(
  () => import('./pages/landing-page/vendorservices/vendor-services')
);
const AboutUs = lazy(() => import('./pages/landing-page/about/about-us'));

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  const user: IUser | null = Session.get('user');
  const isAuthenticated = !!user;

  useEffect(() => {
    if (import.meta.env.PROD && user?._id && user?.email) {
      setSentryUser({
        id: user._id,
        email: user.email,
        username: user.firstName,
      });
    }
  }, [user]);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense
          fallback={
            <div className='p-8 text-center text-white'>Loading...</div>
          }
        >
          {/* Your branch's routing system */}
          <AppRoutes RoutesComponent={SentryRoutes} />

          {/* Landing page routes from origin/main */}
          <SentryRoutes>
            {/* Public routes */}
            <Route element={<LandingPageLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/vendor-services' element={<VendorAndServices />} />
              <Route path='/about-us' element={<AboutUs />} />
            </Route>

            {/* Authenticated role-based routes */}
            {isAuthenticated && user?.role === 'user' && (
              <Route path='/dashboard' element={<Home />} />
            )}
            {isAuthenticated && user?.role === 'distributor' && (
              <Route path='/distributor' element={<Home />} />
            )}
            {isAuthenticated && user?.role === 'manufacturer' && (
              <Route path='/manufacturer' element={<Home />} />
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Route path='/admin' element={<Home />} />
            )}
          </SentryRoutes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

const AppWithProfiler = Sentry.withProfiler(App);
AppWithProfiler.displayName = 'App';

export default AppWithProfiler;
