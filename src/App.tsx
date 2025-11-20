import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import * as Sentry from '@sentry/react';
import { Toaster } from "./components/ui/sonner";

// Lazy imports from origin/main
const LandingPageLayout = lazy(() => import("./layout/landing-page-layout"));
const DashboardLayout = lazy(() => import("./layout/dashboard-layout"));
const SignInPage = lazy(() => import("./pages/auth/sign-in"));
const RegisterPage = lazy(() => import("./pages/auth/register"));
const Logout = lazy(() => import("./pages/auth/logout"));

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
const TermsAndConditions = lazy(() => import("./pages/terms-and-conditions/terms-and-conditions"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy/privacy-policy"));

const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const DistributorDashboard = lazy(() => import("./pages/distributor/DistributorDashboard"));
const ManufacturerDashboard = lazy(() => import("./pages/manufacturer/ManufacturerDashboard"));

const Profile = lazy(() => import("./pages/dashboard/profile/Profile"));

const Category = lazy(() => import("./pages/admin/category/Category"));
const DistributorServices = lazy(() => import("./pages/distributor/service/Service"));

import { ErrorBoundary } from "./components/ErrorBoundary";
import { setSentryUser } from "./config/sentry";
import { useReduxAuth } from "./hooks/useReduxAuth";
import { useAuth } from "./hooks/useAuth";
import { Loading } from "./components/ui/Loading";
import { isLoggedIn } from "./utils/IsLoggedIn";

// Route definition files (clean system)
import { publicRoutes } from "./routes/publicRoutes";
import { crewRoutes } from "./routes/crewRoutes";
import { distributorRoutes } from "./routes/distributorRoutes";
import { manufacturerRoutes } from "./routes/manufacturerRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { useReduxUser } from "./hooks/useReduxUser";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App: React.FC = () => {
  useAuth();

  const { user } = useReduxAuth();
  const isAuthenticated = isLoggedIn();
  const reduxUser = useReduxUser();

  useEffect(() => {
    if (import.meta.env.PROD && user?._id && user?.email) {
      setSentryUser({
        id: user._id,
        email: user.email,
        username: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [user]);

  // Clean consolidated route decision logic
  const getAuthenticatedRoutes = () => {
    if (!isAuthenticated || !user?.role) return null;

    switch (user.role) {
      case "user":
        return crewRoutes;
      case "distributor":
        return distributorRoutes;
      case "manufacturer":
        return manufacturerRoutes;
      case "admin":
        return adminRoutes;
      default:
        return null;
    }
  };

  const authenticatedRoutes = getAuthenticatedRoutes();

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
            {/* Public routes */}
            {renderRoutes(publicRoutes)}

            {/* Auth routes based on role */}
            {authenticatedRoutes && renderRoutes(authenticatedRoutes)}

            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </SentryRoutes>
        </Suspense>

        {/* Keep richColors */}
        <Toaster richColors={true} position="top-right" />
      </Router>
    </ErrorBoundary>
  );
};

const AppWithProfiler = Sentry.withProfiler(App);
AppWithProfiler.displayName = "App";

export default AppWithProfiler;
