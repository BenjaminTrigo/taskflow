# TaskFlow - Gestor de Tareas Personal

Aplicación web de gestión de tareas personales desarrollada con Angular 21.

## Características Implementadas

### Funcionalidades Principales

1. **Listado de Tareas**
   - Visualización de todas las tareas en una lista organizada
   - Cada tarea muestra: título, descripción truncada, fecha de creación, estado y prioridad
   - Indicadores visuales distintivos para tareas pendientes y completadas
   - Estadísticas en tiempo real (total, pendientes, completadas)

2. **Crear Nueva Tarea**
   - Formulario reactivo con validaciones en tiempo real
   - Campos:
     - Título (obligatorio, mínimo 3 caracteres)
     - Descripción (opcional, máximo 200 caracteres con contador)
     - Prioridad (baja, media, alta)
   - Botón de guardar deshabilitado cuando el formulario es inválido
   - Mensajes de error descriptivos

3. **Editar Tarea**
   - Modificación de cualquier campo de tareas existentes
   - Precarga automática de datos actuales en el formulario
   - Mismo formulario usado para crear y editar (reutilización de código)

4. **Eliminar Tarea**
   - Confirmación obligatoria antes de eliminar
   - Feedback visual inmediato tras la eliminación

5. **Marcar como Completada**
   - Checkbox para alternar el estado de la tarea
   - Estilo visual diferenciado para tareas completadas (opacidad, tachado)

6. **Filtros en Tiempo Real**
   - Filtrar por estado: Todas / Pendientes / Completadas
   - Actualización instantánea de la vista al cambiar filtros
   - Indicador visual del filtro activo

### Tecnologías Utilizadas

- **Angular 21** - Framework principal
- **Standalone Components** - Arquitectura moderna de Angular
- **Reactive Forms** - Manejo de formularios con validaciones
- **Angular Router** - Navegación entre vistas
- **TypeScript** - Tipado estricto con interfaces
- **LocalStorage** - Persistencia de datos en el navegador
- **Signals** - Manejo reactivo del estado

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── task-list/
│   │   │   └── task-list.component.ts
│   │   ├── task-form/
│   │   │   └── task-form.component.ts
│   │   ├── task-item/
│   │   │   └── task-item.component.ts
│   │   └── task-filters/
│   │       └── task-filters.component.ts
│   ├── services/
│   │   └── task.service.ts
│   ├── models/
│   │   └── task.model.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── global_styles.css
└── index.html
```

## Instalación y Uso

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start / ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Compilación

```bash
# Compilar para producción
npm run build / ng build
```


## Modelo de Datos

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
```

## Rutas de la Aplicación

- `/` - Lista de tareas (vista principal)
- `/task/new` - Crear nueva tarea
- `/task/:id` - Editar tarea existente


### Servicio de Tareas (TaskService)
- Uso de Signals para reactividad
- Persistencia automática en LocalStorage
- Operaciones CRUD completas
- Generación automática de IDs únicos

### Componentes
- **TaskListComponent**: Vista principal con filtros y estadísticas
- **TaskFormComponent**: Formulario reutilizable para crear/editar
- **TaskItemComponent**: Tarjeta individual de tarea con acciones
- **TaskFiltersComponent**: Controles de filtrado

### Validaciones
- Título: requerido y mínimo 3 caracteres
- Descripción: máximo 200 caracteres con contador visual
- Prioridad: valor requerido con opciones predefinidas

### Diseño UX
- Interfaz limpia y moderna con gradiente de fondo
- Tarjetas con efectos hover para mejor interactividad
- Badges de colores para prioridades (azul/amarillo/rojo)
- Estados vacíos informativos con mensajes contextuales
- Diseño responsive para diferentes dispositivos
- Transiciones suaves en todos los elementos interactivos

## Desarrollador

Aplicación desarrollada como parte de una prueba técnica para Desarrollador Frontend Angular (Junior).
