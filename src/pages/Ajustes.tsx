import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { usersService, type FullUserProfile } from '@/services/usersService';
import { useAuth } from '@/contexts/AuthContext';
import { PageLayout } from '@/components/layout/PageLayout';

/** Fila de dato de perfil con label y valor */
function ProfileRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block">
        {label}
      </span>
      <div className="text-sm font-medium text-on-surface">{value}</div>
    </div>
  );
}

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
    <PageLayout
      title="Ajustes"
      subtitle="Información de tu cuenta y empresa"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {/* Perfil de Usuario */}
        <Card className="bg-surface border-outline shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Perfil de Usuario</CardTitle>
            <CardDescription>Información personal y de acceso</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[70%]" />
                <Skeleton className="h-4 w-[55%]" />
                <Skeleton className="h-5 w-16 mt-1" />
              </div>
            ) : profile ? (
              <div className="space-y-4 text-sm">
                <ProfileRow label="Nombre Completo" value={profile.full_name} />
                <ProfileRow label="Correo Electrónico" value={authUser?.email} />
                <ProfileRow label="Documento / Cédula" value={profile.national_id} />
                <ProfileRow
                  label="Rol"
                  value={
                    <Badge variant="outline" className="capitalize mt-0.5 text-xs">
                      {profile.role || 'Usuario'}
                    </Badge>
                  }
                />
              </div>
            ) : (
              <p className="text-sm text-secondary">
                No se pudo cargar el perfil. Revisa tu conexión o autenticación.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Datos de la Empresa */}
        <Card className="bg-surface border-outline shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Datos de la Empresa</CardTitle>
            <CardDescription>Entorno de trabajo activo</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[65%]" />
                <Skeleton className="h-5 w-20 mt-1" />
              </div>
            ) : profile?.companies ? (
              <div className="space-y-4 text-sm">
                <ProfileRow label="Nombre de la Empresa" value={profile.companies.name} />
                <ProfileRow
                  label="Plan de Suscripción"
                  value={
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 mt-0.5 text-xs capitalize">
                      {profile.companies.subscription_plan || 'Gratis'}
                    </Badge>
                  }
                />
                <ProfileRow
                  label="Estado Operativo"
                  value={
                    profile.companies.is_active ? (
                      <Badge className="bg-green-100 text-green-700 border-0 mt-0.5 text-xs hover:bg-green-200">
                        Activa
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-0 mt-0.5 text-xs hover:bg-red-200">
                        Inactiva
                      </Badge>
                    )
                  }
                />
              </div>
            ) : (
              <p className="text-sm text-secondary">
                No perteneces a ninguna empresa registrada.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
