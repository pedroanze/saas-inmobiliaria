import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-secondary">Verificando sesión...</p>
      </div>
    );
  }

  if (session) {
    // Si el usuario ya está autenticado y trata de entrar a rutas de invitado (ej. Login)
    // Se redirige automáticamente a su zona protegida
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
