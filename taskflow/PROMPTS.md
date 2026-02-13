# Prompts Utilizados

Este archivo documenta los prompts utilizados durante el desarrollo de la aplicación TaskFlow.

## Prompt Principal

```
Haz una app con angular que cumpla con las condiciones de archivo
[Se proporcionó el PDF con los requisitos de la prueba técnica]
```

## Contexto

Se utilizó Claude Code (Claude Sonnet 4.5) como herramienta de desarrollo asistido por IA para implementar la aplicación TaskFlow según los requisitos especificados en la prueba técnica.

## Proceso de Desarrollo

La IA implementó automáticamente:

1. **Estructura del proyecto** siguiendo la arquitectura especificada en el documento
2. **Modelo de datos** con la interfaz Task según las especificaciones
3. **Servicio de tareas** (TaskService) con:
   - Operaciones CRUD completas
   - Persistencia en LocalStorage
   - Uso de Signals para reactividad
4. **Componentes standalone**:
   - TaskListComponent (vista principal con filtros y estadísticas)
   - TaskFormComponent (formulario reutilizable para crear/editar)
   - TaskItemComponent (tarjeta individual de tarea)
   - TaskFiltersComponent (controles de filtrado)
5. **Reactive Forms** con todas las validaciones requeridas:
   - Título: obligatorio, mínimo 3 caracteres
   - Descripción: opcional, máximo 200 caracteres
   - Prioridad: campo requerido con opciones predefinidas
6. **Routing** con las rutas necesarias
7. **Estilos CSS** para una interfaz limpia y funcional
8. **README.md** con documentación completa

## Resultados

- Todos los requisitos funcionales obligatorios fueron implementados
- El código compila sin errores (`npm run build` exitoso)
- Se utilizó TypeScript con tipado estricto
- Arquitectura moderna de Angular con standalone components
- Interfaz de usuario intuitiva y responsive
- Validaciones en tiempo real con mensajes de error
- Persistencia de datos con LocalStorage

## Notas

La IA fue utilizada como herramienta principal de desarrollo, siguiendo fielmente los requisitos del documento de prueba técnica. Todo el código generado es comprensible y sigue las mejores prácticas de Angular.
