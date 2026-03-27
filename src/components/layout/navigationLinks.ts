import { LayoutDashboard, Package, ArrowRightLeft, Settings } from 'lucide-react';

/** Lista de enlaces de navegación del sidebar. Separada del componente para cumplir react-refresh. */
export const navigationLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventario', href: '/inventario', icon: Package },
  { name: 'Transacciones', href: '/transacciones', icon: ArrowRightLeft },
  { name: 'Ajustes', href: '/ajustes', icon: Settings },
];
