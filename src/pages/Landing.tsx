import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-on-surface text-4xl font-bold">
          Minimalismo Suave
        </h1>
        <p className="text-secondary text-lg">
          Tu futura landing page empresarial.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <Button>Ir al Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
