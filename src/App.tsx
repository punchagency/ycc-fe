import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from "./components/ErrorBoundary";
import { setSentryUser } from "./config/sentry";
import Session from "./utils/Session";
import type { IUser } from "./types/auth.type";
import AppRoutes from "./routes";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.PROD) {
      const user: IUser = Session.get('user');
      if (user?._id && user?.email) {
        setSentryUser({
          id: user._id,
          email: user.email,
          username: user.firstName,
        });
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div className="p-8 text-center text-white">Loading...</div>}>
          <AppRoutes RoutesComponent={SentryRoutes} />
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

const AppWithProfiler = Sentry.withProfiler(App);
AppWithProfiler.displayName = 'App';

export default AppWithProfiler;