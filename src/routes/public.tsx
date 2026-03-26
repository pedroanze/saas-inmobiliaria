import type { RouteObject } from 'react-router-dom';
import { GuestGuard } from '@/components/guards/GuestGuard';
import Login from '@/pages/Login';
import Landing from '@/pages/Landing';

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: '/',
    element: <Landing />,
  },
];
