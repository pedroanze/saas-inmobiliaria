import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginWithPassword } from '@/services/auth';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      toast.warning('El correo electrónico es obligatorio');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning('Ingresa un correo con formato válido (ej. tu@correo.com)');
      return false;
    }
    if (!password) {
      toast.warning('La contraseña es obligatoria');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await loginWithPassword(email, password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      // Ajuste de mensajes de error de Supabase p/ usuario
      if (message.includes('Invalid login credentials')) {
        toast.error('Usuario o contraseña incorrectos.');
      } else {
        toast.error('Ocurrió un error: ' + message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="bg-surface shadow-float relative w-full max-w-md overflow-hidden rounded-xl border border-white/10 p-8 backdrop-blur-md">
        <div className="via-primary/50 absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent"></div>

        <div className="mt-2 mb-10 space-y-3 text-center">
          <h1 className="text-on-surface text-3xl font-bold tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="text-secondary text-sm">
            Ingresa tus credenciales para acceder a tu panel.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-on-surface">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface-container-high border-outline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-on-surface">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-surface-container-high border-outline"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full font-semibold transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.98]">
            {loading ? 'Verificando...' : 'Ingresar al sistema'}
          </Button>
        </form>
      </div>
    </div>
  );
}
