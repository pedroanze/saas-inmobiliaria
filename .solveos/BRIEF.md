## Plan Brief: Pulir y Validar Auth (Login)

**Problema**
El inicio de sesión funcional básico está implementado (Supabase), pero la interfaz es plana y carece de feedback visual claro (errores, éxito, loading). Además faltan validaciones de formulario robustas y confirmación de que los Guards protegen las rutas correctamente.

**Audiencia**
Dueños de las inmobiliarias/casas de empeño y sus empleados.

**Objetivo**
Refinar el flujo de inicio de sesión con una interfaz de usuario premium (Terracotta Silk), notificaciones estandarizadas tipo Toast, validaciones de texto y Guards de ruta activos.

**Apetito**
Solo enfocado en el flujo de Login existente. Mejoras visuales y de UX.

**Restricciones**
- UI debe mantener la estética premium, limpia y seria.
- Uso de componentes Shadcn UI (añadir sistema de Toasts).
- Validación de formulario clara para el usuario (emails inválidos, contraseñas vacías).

**Criterios de éxito**
- [ ] La pantalla de `Login.tsx` tiene un diseño atractivo ("interesante") y alineado con el sistema de diseño.
- [ ] El formulario valida el formato de entrada (email y contraseña requerida) antes de enviar a Supabase.
- [ ] Sistema de Toasts implementado: Notifica si hay error de credenciales ("Usuario o contraseña incorrectos") o éxito.
- [ ] El `AuthGuard` impide el acceso a rutas protegidas (ej. `/dashboard`, `/transacciones`) redirigiendo al login.

**Supuesto central**
La conexión subyacente de Supabase (AuthClient) ya valida contra el backend; solo necesitamos enlazar adecuadamente los errores a la UI.

**Pozos sin fondo**
- Flujos de recuperación de contraseña ("Olvidé mi contraseña").
- Creación y registro de nuevas cuentas públicas (Sign up).
- Roles complejos (RBAC) dentro del guard; por ahora solo verificamos sesión activa vs no activa.

**Fuera de alcance**
- Perfil de usuario o edición de avatar.
- SSO con Google / Microsoft.
