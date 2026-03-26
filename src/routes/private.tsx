import type { RouteObject } from 'react-router-dom';
import { AuthGuard } from '@/components/guards/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import Inventario from '@/pages/Inventario';
import Ajustes from '@/pages/Ajustes';
import Transacciones from '@/pages/Transacciones';

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'inventario',
        element: <Inventario />,
      },
      {
        path: 'ajustes',
        element: <Ajustes />,
      },
      {
        path: 'transacciones',
        element: <Transacciones />,
      },
    ],
  },
];
