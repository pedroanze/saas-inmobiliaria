import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { usersService, type FullUserProfile } from '@/services/usersService';
import { useAuth } from '@/contexts/AuthContext';

export default function Ajustes() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<FullUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      const data = await usersService.getCurrentUserProfile();
      if (mounted) {
        setProfile(data);
        setIsLoading(false);
      }
    }
    loadProfile();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="border-outline flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-on-surface text-2xl font-bold">Ajustes y Perfil</h1>
            <p className="text-secondary text-sm">Gestiona tu información personal y los detalles de tu empresa</p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-2">
          {/* USER CARD */}
          <Card className="bg-surface shadow-float border-outline">
            <CardHeader>
              <CardTitle>Perfil de Usuario</CardTitle>
              <CardDescription>Información personal y de acceso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-[85%]" />
                  <Skeleton className="h-4 w-[75%]" />
                  <Skeleton className="h-4 w-[60%]" />
                  <Skeleton className="mt-2 h-6 w-16" />
                </div>
              ) : profile ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Nombre Completo</span>
                    <span className="text-on-surface font-medium">{profile.full_name}</span>
                  </div>
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Correo Electrónico</span>
                    <span className="text-on-surface font-medium">{authUser?.email}</span>
                  </div>
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Documento / Cédula</span>
                    <span className="text-on-surface font-medium">{profile.national_id}</span>
                  </div>
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Rol</span>
                    <div className="mt-1">
                      <Badge variant="outline" className="capitalize">{profile.role || 'Usuario'}</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary text-sm">No se pudo cargar el perfil. Revisa tu conexión o autenticación.</p>
              )}
            </CardContent>
          </Card>

          {/* COMPANY CARD */}
          <Card className="bg-surface shadow-float border-outline">
            <CardHeader>
              <CardTitle>Datos de la Empresa</CardTitle>
              <CardDescription>Información del entorno de trabajo en la Inmobiliaria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-[85%]" />
                  <Skeleton className="h-4 w-[75%]" />
                  <Skeleton className="mt-2 h-6 w-20" />
                </div>
              ) : profile?.companies ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Nombre de la Inmobiliaria</span>
                    <span className="text-on-surface font-medium">{profile.companies.name}</span>
                  </div>
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Plan de Suscripción</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="bg-primary/10 text-primary capitalize hover:bg-primary/20">
                        {profile.companies.subscription_plan || 'Gratis'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary block text-xs font-medium uppercase tracking-wider">Estado Operativo</span>
                    <div className="mt-1">
                      {profile.companies.is_active ? (
                        <Badge variant="secondary" className="border-green-200 bg-green-100 text-green-700 hover:bg-green-200">Activa</Badge>
                      ) : (
                        <Badge variant="secondary" className="border-red-200 bg-red-100 text-red-700 hover:bg-red-200">Inactiva</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary text-sm">No perteneces a ninguna empresa registrada o hubo un error al cargar.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
