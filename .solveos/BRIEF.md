## Plan Brief: MVP de Registro (Transacciones e Inventario)

**Problema**
Las inmobiliarias y casas de empeño registran ventas, compras y préstamos en medios físicos (recibos, cuadernos) o herramientas rudimentarias (Excel). Esto consume tiempo y genera un registro propenso a errores, difícil de auditar y con carencias para escalar el negocio.

**Audiencia**
Dueños de las casas/inmobiliarias (que necesitan ver las métricas) y sus empleados (que registran las operaciones del día a día).

**Objetivo**
Construir el MVP del sistema que permita registrar, visualizar y gestionar un inventario básico y transacciones (compras, ventas, préstamos), para centralizar y digitalizar la operación manual.

**Apetito**
Lo estrictamente indispensable para tener la funcionalidad "core" funcionando de manera robusta y limpia. Nos enfocaremos solo en las transacciones para este primer ciclo.

**Restricciones**
- Interfaz limpia, profesional y alineada con la filosofía "Legibilidad y orden > Velocidad".
- Uso estricto de React, Tailwind CSS v4, y Shadcn UI.
- Los componentes deben mantenerse pequeños y específicos, siguiendo DRY y KISS.
- Almacenamiento conectado al stack existente (Supabase).

**Criterios de éxito**
- [ ] La página `Transacciones.tsx` muestra un listado/tabla de transacciones.
- [ ] Existe un formulario para registrar una nueva transacción (venta, compra, o préstamo).
- [ ] Cada transacción distingue claramente su tipo y monto básico.
- [ ] La interfaz cumple con el diseño "Terracotta Silk" (premium, moderno y limpio).

**Supuesto central**
Disponemos de un esquema de base de datos base (o podemos crearlo) en Supabase para almacenar la información de la transacción sin requerir relaciones extremadamente complejas en esta fase MVP.

**Pozos sin fondo**
- Sistema avanzado de impresión de Invoices/Recibos en PDF (se posterga para la iteración 2).
- Dashboard visual de métricas del negocio (se posterga hasta tener datos reales fluyendo).
- Permisos complejos de Auth entre dueños y empleados.

**Fuera de alcance**
- Reportes exportables.
- Notificaciones automáticas.
- Historial exhaustivo de modificaciones en caja.
