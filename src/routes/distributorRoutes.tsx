import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load distributor pages
const DistributorDashboard = lazy(() => import('../pages/distributor/DistributorDashboard'));

export const distributorRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DistributorDashboard />,
      },
      // Add more distributor-specific routes here as your application grows
    ],
  },
];
