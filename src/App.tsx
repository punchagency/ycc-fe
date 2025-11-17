import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Sentry from '@sentry/react';
import Home from "./pages/landing-page/home";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { setSentryUser } from "./config/sentry";
import Session from "./utils/Session";
import type { IUser } from "./types/auth.type";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.MODE) {
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
        <div className="flex flex-col min-h-screen">
          <main className="grow">
            <SentryRoutes>
              <Route path="/" element={<Home />} />
            </SentryRoutes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default Sentry.withProfiler(App);