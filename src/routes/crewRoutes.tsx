import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load crew/user pages
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));
const Settings = lazy(() => import('../pages/crew/Settings'));
const Profile = lazy(() => import("../pages/dashboard/profile/Profile"));

export const crewRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <UserDashboard />,
      },
      {
        path: '/crew/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      // Add more crew-specific routes here as your application grows
    ],
  },
];