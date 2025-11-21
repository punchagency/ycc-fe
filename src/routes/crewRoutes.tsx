import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load crew/user pages
const UserDashboard = lazy(() => import('../pages/crew/UserDashboard'));
const Settings = lazy(() => import('../pages/crew/Settings'));
const Documents = lazy(() => import('../pages/crew/Document'));
const DocumentList = lazy(() => import('../pages/crew/DocumentList'));

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
        path: '/crew/documents',
        element: <Documents />,
      },
      {
        path: '/crew/documents/list',
        element: <DocumentList />,
      },
      // Add more crew-specific routes here as your application grows
    ],
  },
];