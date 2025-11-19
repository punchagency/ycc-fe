import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Sentry from '@sentry/react';
import { Toaster } from "./components/ui/sonner";

// Landing Page
const LandingPageLayout = lazy(() => import("./layout/landing-page-layout"));
const DashboardLayout = lazy(() => import("./layout/dashboard-layout"));
const SignInPage = lazy(() => import("./pages/auth/sign-in"));
const RegisterPage = lazy(() => import("./pages/auth/register"));

const Home = lazy(() => import("./pages/landing-page/home/home"));
const VendorAndServices = lazy(() => import("./pages/landing-page/vendorservices/vendor-services"));
const AboutUs = lazy(() => import("./pages/landing-page/about/about-us"));
const ResourceCenter = lazy(() => import("./pages/landing-page/resource-center/resource-center"));
const ContactUs = lazy(() => import("./pages/landing-page/contact/contact-us"));

const CrewLandingPage = lazy(() => import("./pages/landing-page/crew/crew"));
const EngineeringLandingPage = lazy(() => import("./pages/landing-page/engineering/engineering"));
const InteriorLandingPage = lazy(() => import("./pages/landing-page/interior/interior"));
const ExteriorLandingPage = lazy(() => import("./pages/landing-page/exterior/exterior"));
const CaptainLandingPage = lazy(() => import("./pages/landing-page/captain/captain"));
const ChefGalleryLandingPage = lazy(() => import("./pages/landing-page/chef-gallery/chef-gallery"));

const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const DistributorDashboard = lazy(() => import("./pages/distributor/DistributorDashboard"));
const ManufacturerDashboard = lazy(() => import("./pages/manufacturer/ManufacturerDashboard"));

import { ErrorBoundary } from "./components/ErrorBoundary";
import { setSentryUser } from "./config/sentry";
import { useReduxAuth } from "./hooks/useReduxAuth";
import { Loading } from "./components/ui/Loading";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  const { user, isAuthenticated } = useReduxAuth();

  useEffect(() => {
    if (import.meta.env.PROD && user?._id && user?.email) {
      setSentryUser({
        id: user._id,
        email: user.email,
        username: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [user]);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense
          fallback={<Loading />}
        >
          <SentryRoutes>
            {/* Unauthenticated routes - always accessible */}
            <Route element={<LandingPageLayout />}>
              {/* LANDING PAGE */}
              <Route path="/" element={<Home />} />
              <Route path="/vendor-services" element={<VendorAndServices />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/resource-center" element={<ResourceCenter />} />
              <Route path="/contact-us" element={<ContactUs />} />

              <Route path="/crew" element={<CrewLandingPage />} />
              <Route path="/engineering" element={<EngineeringLandingPage />} />
              <Route path="/interior" element={<InteriorLandingPage />} />
              <Route path="/exterior" element={<ExteriorLandingPage />} />
              <Route path="/captain" element={<CaptainLandingPage />} />
              <Route path="/chef-gallery" element={<ChefGalleryLandingPage />} />
              <Route path='/login' element={<SignInPage />} />
              <Route path='/get-started' element={<RegisterPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Authenticated routes with sidebar layout */}
            {/* Authenticated routes based on user role */}
            {isAuthenticated && user?.role === 'user' && (
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<UserDashboard />} />
              </Route>
            )}
            {isAuthenticated && user?.role === 'distributor' && (
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DistributorDashboard />} />
              </Route>
            )}
            {isAuthenticated && user?.role === 'manufacturer' && (
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<ManufacturerDashboard />} />
              </Route>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<AdminDashboard />} />
              </Route>

            )}
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
