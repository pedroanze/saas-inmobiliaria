import {
  ShieldCheckIcon,
  ZapIcon,
  LayoutDashboardIcon,
  ArrowRightLeftIcon,
  PackageIcon,
  BarChart3Icon,
} from 'lucide-react';

export const LOGO =
  'https://res.cloudinary.com/dkoqe8las/image/upload/v1774657910/logo_prestasys_1_bqzoew.png';

export const WA_NUMBER = '59179288990';
export const WA_MESSAGE = encodeURIComponent('¡Hola! Quiero saber más sobre Prestasys.');

export const NAV_LINKS = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Precios', href: '#precios' },
  { label: 'Contacto', href: '#contacto' },
];

export const FEATURES = [
  {
    icon: ArrowRightLeftIcon,
    title: 'Transacciones en Segundos',
    description:
      'Registra compras, empeños y ventas en un flujo guiado de 3 pasos. Sin errores, sin datos sueltos.',
  },
  {
    icon: PackageIcon,
    title: 'Inventario en Tiempo Real',
    description:
      'Cada artículo tiene su estado: empeñado, comprado, en venta o vendido. Siempre sabrás qué tienes.',
  },
  {
    icon: LayoutDashboardIcon,
    title: 'Panel de Control Centralizado',
    description:
      'Ve el balance de caja, artículos activos y movimientos del día desde un solo lugar.',
  },
  {
    icon: BarChart3Icon,
    title: 'Libro Mayor Digital',
    description:
      'Cada operación genera un asiento inmutable. Tu contabilidad siempre cuadra, sin esfuerzo.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Seguridad y Multi-empresa',
    description:
      'Cada empresa tiene su propio entorno aislado. Tus datos son solo tuyos.',
  },
  {
    icon: ZapIcon,
    title: 'Registro de Clientes Inteligente',
    description:
      'Busca clientes por cédula al instante. Si no existen, los registra en el mismo flujo.',
  },
];

export const STEPS = [
  {
    number: '01',
    title: 'Identificas al Cliente',
    description: 'Búsqueda por cédula o creación al instante.',
  },
  {
    number: '02',
    title: 'Registras el Artículo',
    description: 'Nombre, categoría, monto y tipo de operación.',
  },
  {
    number: '03',
    title: 'Asientas la Caja',
    description: 'El libro mayor se actualiza automáticamente.',
  },
];
