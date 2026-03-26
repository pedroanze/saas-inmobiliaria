import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { usersService, type FullUserProfile } from '@/services/usersService';
import { navigationLinks } from './Sidebar';
import { cn } from '@/lib/utils';

export function TopNav() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<FullUserProfile | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchName() {
      const data = await usersService.getCurrentUserProfile();
      if (mounted) {
        setProfile(data);
      }
    }
    fetchName();
    return () => { mounted = false; };
  }, []);

  // Tratamos de obtener el nombre; si no, el email o un fallback
  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email || 'Usuario';
  const companyName = profile?.companies?.name || 'Empresa';
  const companyLogo = profile?.companies?.logo_url || '';
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <header className="bg-surface flex h-16 shrink-0 items-center justify-between border-b px-4 lg:px-8">
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger className="lg:hidden text-secondary hover:text-on-surface p-2 rounded-md hover:bg-secondary/10 transition-colors">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center justify-center border-b">
              <h1 className="text-primary text-xl font-bold tracking-tight">SaaS Inmobiliaria</h1>
            </div>
            <nav className="flex flex-col space-y-2 p-4">
              {navigationLinks.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-secondary hover:bg-secondary/10 hover:text-on-surface'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block text-on-surface font-medium">
        ¡Hola, {userName}!
      </div>
      <div className="lg:hidden text-on-surface font-semibold tracking-tight">
        Panel
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 w-9 rounded-full outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
            <Avatar className="h-9 w-9 border border-outline/50 shadow-sm transition-transform hover:scale-105">
              <AvatarImage src={companyLogo} alt={companyName} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">{initial}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal text-on-surface">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-secondary truncate">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/ajustes')} className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:bg-destructive/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
