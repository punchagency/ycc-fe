import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
const LandingPageLayout = lazy(() => import("./layout/landing-page-layout"));

// main pages
const Home = lazy(() => import("./pages/landing-page/home/home")) ;
const VendorAndServices = lazy(() => import("./pages/landing-page/vendorservices/vendor-services"));
const AboutUs = lazy(() => import("./pages/landing-page/about/about-us"));
const ContactUs = lazy(() => import("./pages/landing-page/contact/contact-us"));
const ResourceCenter = lazy(() => import("./pages/landing-page/resource-center/resource-center"));


import * as Sentry from '@sentry/react';
import { ErrorBoundary } from "./components/ErrorBoundary";
import { setSentryUser } from "./config/sentry";
import Session from "./utils/Session";
import type { IUser } from "./types/auth.type";
import { useReduxAuth } from "./hooks/useReduxAuth";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  const { isAuthenticated, user } = useReduxAuth();
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
        <SentryRoutes>
          {/* Unauthenticated routes - always accessible */}
          <Route element={<LandingPageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/vendor-services" element={<VendorAndServices />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/resource-center" element={<ResourceCenter />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>
          
          {/* Authenticated routes based on user role */}
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
        </SentryRoutes>
      </Router>
    </ErrorBoundary>
  );
};

const AppWithProfiler = Sentry.withProfiler(App);
AppWithProfiler.displayName = 'App';

export default AppWithProfiler;