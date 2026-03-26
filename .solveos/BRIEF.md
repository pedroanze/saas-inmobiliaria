## Plan Brief: Dashboard Layout e Interfaz Principal

**Problema**
Actualmente las vistas del usuario autenticado están desconectadas y carecen de un marco de navegación centralizado y amigable. No es evidente cómo saltar del Dashboard al Inventario o a las Transacciones, ni quién ha iniciado sesión.

**Audiencia**
Dueños y empleados que utilizarán el sistema día a día.

**Objetivo**
Construir un `DashboardLayout` que actúe como esqueleto principal para todas las rutas privadas. Debe contener un *Sidebar* navegable colapsable y un *Navbar* superior con saludo y perfil del usuario autenticado.

**Apetito**
Construir el contenedor y cablear la navegación de las 4 rutas principales. Diseño responsivo (mobile-first o con drawer para móvil) sin sobreingenierizar la carga de rutas dinámicas complejas.

**Restricciones**
- El componente debe ser 100% responsivo (Sidebar se oculta o se vuelve un "hamburger menu" en pantallas pequeñas).
- Estética premium, utilizando Tailwind y Shadcn UI.
- La información de perfil ("Hola, Nombre" y el avatar) debe alimentarse directamente del `useAuth()`.

**Criterios de éxito**
- [ ] Creación de `DashboardLayout.tsx`.
- [ ] El *Sidebar* tiene las rutas: Dashboard, Inventario, Transacciones, Ajustes.
- [ ] El *Navbar* tiene un saludo personalizado y la foto/avatar del usuario.
- [ ] En pantallas pequeñas (`md` o menor), el Sidebar es colapsable/desplegable correctamente sin romper el layout.
- [ ] El router está refactorizado para que las vistas privadas se rendericen dentro del `Outlet` de este layout.

**Supuesto central**
Asumimos que la información de nombre/avatar del usuario existe (o al menos un "placeholder" con su email derivado de Supabase).

**Pozos sin fondo**
- Sub-rutas anidadas profundas o breadcrumbs calculados dinámicamente.
- Modos oscuros/claros combinados con colores personalizados por empresa.

**Fuera de alcance**
- Búsqueda global en el Navbar.
- Notificaciones en tiempo real en la campanita.
