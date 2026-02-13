# taskflow
Aplicacion de lista de tareas.

Repositorio de Prueba Tecnica.

-- Instalaciones
1- Clonar el reposito
2- Instalar Nodejs npm install @angular/cli


1. Listado de Tareas
• Mostrar todas las tareas en una lista
• Cada tarea debe mostrar: título, descripción (truncada), fecha de creación y estado
• Indicador visual del estado (pendiente/completada)
2. Crear Nueva Tarea
Formulario con los campos:
• Título (obligatorio, mínimo 3 caracteres)
• Descripción (opcional, máximo 200 caracteres)
• Prioridad (baja, media, alta)
• Validaciones en tiempo real con mensajes de error
• Botón de guardar deshabilitado si el formulario es inválido
3. Editar Tarea
• Permitir modificar cualquier campo de una tarea existente
• Precargar los datos actuales en el formulario
4. Eliminar Tarea

• Confirmación antes de eliminar
• Feedback visual al usuario tras la eliminación
5. Marcar como Completada
• Toggle para cambiar el estado de la tarea
• Estilo visual diferente para tareas completadas
6. Filtros Básicos
• Filtrar por estado: Todas / Pendientes / Completadas
• Los filtros deben actualizar la vista en tiempo real


Requisito Descripción
Angular Versión 17 o superior
Standalone Components Utilizar la arquitectura de componentes standalone
Reactive Forms Para todos los formularios
Routing Mínimo 2 rutas (lista de tareas y crear/editar tarea)
Servicios Al menos un servicio para la lógica de negocio
TypeScript Tipado estricto preferiblemente, interfaces para los modelos
Persistencia LocalStorage para guardar las tareas


src/
■■■ app/
■ ■■■ components/
■ ■ ■■■ task-list/
■ ■ ■■■ task-form/
■ ■ ■■■ task-item/
■ ■ ■■■ task-filters/
■ ■■■ services/
■ ■ ■■■ task.service.ts
■ ■■■ models/
■ ■ ■■■ task.model.ts
■ ■■■ app.component.ts
■ ■■■ app.routes.ts
■ ■■■ app.config.ts
■■■ assets/
■■■ styles.css


interface Task {
id: string;
title: string;
description?: string;
priority: 'low' | 'medium' | 'high';
completed: boolean;
createdAt: Date;
updatedAt?: Date;
}