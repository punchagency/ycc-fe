import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load distributor pages
const DistributorDashboard = lazy(() => import('../pages/distributor/DistributorDashboard'));
const Settings = lazy(() => import('../pages/distributor/Settings'));

export const distributorRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DistributorDashboard />,
      },
      {
        path: '/distributor/settings',
        element: <Settings />,
      },
      // Add more distributor-specific routes here as your application grows
    ],
  },
];
