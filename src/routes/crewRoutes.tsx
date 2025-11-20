import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load crew/user pages
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));

export const crewRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <UserDashboard />,
      },
      // Add more crew-specific routes here as your application grows
    ],
  },
];
