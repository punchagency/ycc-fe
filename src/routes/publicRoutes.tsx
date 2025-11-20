import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { UnauthenticatedOnly } from '../components/route-guards/UnauthenticatedOnly';

// Lazy load layout
const LandingPageLayout = lazy(() => import('../layout/landing-page-layout'));

// Lazy load pages
const Home = lazy(() => import('../pages/landing-page/home/home'));
const VendorAndServices = lazy(() => import('../pages/landing-page/vendorservices/vendor-services'));
const AboutUs = lazy(() => import('../pages/landing-page/about/about-us'));
const ResourceCenter = lazy(() => import('../pages/landing-page/resource-center/resource-center'));
const ContactUs = lazy(() => import('../pages/landing-page/contact/contact-us'));

const CrewLandingPage = lazy(() => import('../pages/landing-page/crew/crew'));
const EngineeringLandingPage = lazy(() => import('../pages/landing-page/engineering/engineering'));
const InteriorLandingPage = lazy(() => import('../pages/landing-page/interior/interior'));
const ExteriorLandingPage = lazy(() => import('../pages/landing-page/exterior/exterior'));
const CaptainLandingPage = lazy(() => import('../pages/landing-page/captain/captain'));
const ChefGalleryLandingPage = lazy(() => import('../pages/landing-page/chef-gallery/chef-gallery'));

const SignInPage = lazy(() => import('../pages/auth/sign-in'));
const RegisterPage = lazy(() => import('../pages/auth/register'));
const Logout = lazy(() => import('../pages/auth/logout'));

const TermsAndConditions = lazy(() => import('../pages/terms-and-conditions/terms-and-conditions'));
const PrivacyPolicy = lazy(() => import('../pages/privacy-policy/privacy-policy'));

export const publicRoutes: RouteObject[] = [
  {
    element: <LandingPageLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/vendor-services',
        element: <VendorAndServices />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/resource-center',
        element: <ResourceCenter />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/crew',
        element: <CrewLandingPage />,
      },
      {
        path: '/engineering',
        element: <EngineeringLandingPage />,
      },
      {
        path: '/interior',
        element: <InteriorLandingPage />,
      },
      {
        path: '/exterior',
        element: <ExteriorLandingPage />,
      },
      {
        path: '/captain',
        element: <CaptainLandingPage />,
      },
      {
        path: '/chef-gallery',
        element: <ChefGalleryLandingPage />,
      },
      {
        path: '/login',
        element: (
          <UnauthenticatedOnly>
            <SignInPage />
          </UnauthenticatedOnly>
        ),
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/get-started',
        element: (
          <UnauthenticatedOnly>
            <RegisterPage />
          </UnauthenticatedOnly>
        ),
      },
    ],
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
];
