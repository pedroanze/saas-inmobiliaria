import type { RouteObject } from 'react-router-dom';
import { AuthGuard } from '@/components/guards/AuthGuard';
import Dashboard from '@/pages/Dashboard';
import Inventario from '@/pages/Inventario';
import Ajustes from '@/pages/Ajustes';
import Transacciones from '@/pages/Transacciones';

export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: '/inventario',
    element: (
      <AuthGuard>
        <Inventario />
      </AuthGuard>
    ),
  },
  {
    path: '/ajustes',
    element: (
      <AuthGuard>
        <Ajustes />
      </AuthGuard>
    ),
  },
  {
    path: '/transacciones',
    element: (
      <AuthGuard>
        <Transacciones />
      </AuthGuard>
    ),
  },
];
