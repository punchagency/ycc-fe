import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load layout
const DashboardLayout = lazy(() => import('../layout/dashboard-layout'));

// Lazy load admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const Category = lazy(() => import('../pages/admin/category/Category'));

export const adminRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <AdminDashboard />,
      },
      {
        path: '/category',
        element: <Category />,
      },
      // Add more admin-specific routes here as your application grows
    ],
  },
];
