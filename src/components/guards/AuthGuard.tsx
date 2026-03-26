import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-secondary">Cargando aplicación...</p>
      </div>
    );
  }

  if (!session) {
    // Redirige al login, pero guarda la ubicación intentada para redirigir después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
