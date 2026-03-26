import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public';
import { privateRoutes } from './private';

export const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  // Ruta por defecto para 404 No Encontrado
  {
    path: '*',
    element: (
      <div className="bg-background text-on-surface flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-secondary mt-2">La página no fue encontrada</p>
        </div>
      </div>
    ),
  },
]);
