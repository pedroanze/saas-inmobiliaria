import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { loginWithPassword } from '@/services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginWithPassword(email, password);
      // Redirigir al dashboard tras un login exitoso
      navigate('/dashboard');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al iniciar sesión.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-surface shadow-float relative w-full max-w-md overflow-hidden rounded-sm p-8">
        <div className="via-primary/30 absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent"></div>

        <div className="mt-2 mb-8 space-y-2 text-center">
          <h1 className="text-on-surface text-2xl font-bold">
            Minimalismo Suave
          </h1>
          <p className="text-secondary text-sm">
            Iniciar Sesión - SaaS Inmobiliaria
          </p>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive border-destructive/20 mb-4 rounded-sm border p-3 text-center text-[13px]">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-secondary text-[13px] font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:border-primary focus:bg-surface focus:ring-primary text-on-surface bg-surface-container-high w-full rounded-sm border border-transparent px-4 py-2.5 text-[15px] transition-all duration-200 outline-none focus:ring-1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-secondary text-[13px] font-medium">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:border-primary focus:bg-surface focus:ring-primary text-on-surface bg-surface-container-high w-full rounded-sm border border-transparent px-4 py-2.5 text-[15px] transition-all duration-200 outline-none focus:ring-1"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Cargando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
