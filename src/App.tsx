import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import * as Sentry from '@sentry/react';
import { Toaster } from "./components/ui/sonner";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { setSentryUser } from "./config/sentry";
import { useReduxAuth } from "./hooks/useReduxAuth";
import { useAuth } from "./hooks/useAuth";
import { Loading } from "./components/ui/Loading";
import { isLoggedIn } from "./utils/IsLoggedIn";

// Import route definitions
import { publicRoutes } from "./routes/publicRoutes";
import { crewRoutes } from "./routes/crewRoutes";
import { distributorRoutes } from "./routes/distributorRoutes";
import { manufacturerRoutes } from "./routes/manufacturerRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { useReduxUser } from "./hooks/useReduxUser";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  // Initialize auth state by fetching profile on app load
  useAuth();

  const { user } = useReduxAuth();
  const isAuthenticated = isLoggedIn();
  const test = useReduxUser()

  console.log({test});
  

  useEffect(() => {
    if (import.meta.env.PROD && user?._id && user?.email) {
      setSentryUser({
        id: user._id,
        email: user.email,
        username: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [user]);

  // Determine which authenticated routes to render based on user role
  const getAuthenticatedRoutes = () => {
    if (!isAuthenticated || !user?.role) return null;

    switch (user.role) {
      case 'user':
        return crewRoutes;
      case 'distributor':
        return distributorRoutes;
      case 'manufacturer':
        return manufacturerRoutes;
      case 'admin':
        return adminRoutes;
      default:
        return null;
    }
  };

  const authenticatedRoutes = getAuthenticatedRoutes();

  // Helper function to render routes from RouteObject array
  const renderRoutes = (routes: any[]) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return <Route key={index} path={route.path} element={route.element} index={route.index} />;
    });
  };

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <SentryRoutes>
            {/* Public routes - always accessible */}
            {renderRoutes(publicRoutes)}

            {/* Authenticated routes based on user role */}
            {authenticatedRoutes && renderRoutes(authenticatedRoutes)}

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </SentryRoutes>
        </Suspense>
        <Toaster richColors={true} />
      </Router>
    </ErrorBoundary>
  );
};

const AppWithProfiler = Sentry.withProfiler(App);
AppWithProfiler.displayName = 'App';

export default AppWithProfiler;