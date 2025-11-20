import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load manufacturer pages
const ManufacturerDashboard = lazy(() => import('../pages/manufacturer/ManufacturerDashboard'));

export const manufacturerRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <ManufacturerDashboard />,
      },
      // Add more manufacturer-specific routes here as your application grows
    ],
  },
];
