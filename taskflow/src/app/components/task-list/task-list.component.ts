import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFiltersComponent } from '../task-filters/task-filters.component';
import { TaskFilter } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskItemComponent, TaskFiltersComponent],
  template: `
    <div class="list-container">
      <header class="list-header">
        <div>
          <h1>TaskFlow</h1>
          <p class="subtitle">Gestiona tus tareas de forma eficiente</p>
        </div>
        <button routerLink="/task/new" class="btn-create">
          + Nueva Tarea
        </button>
      </header>

      <app-task-filters (filterChange)="onFilterChange($event)" />

      <div class="task-stats">
        <span class="stat">
          <strong>{{ taskService.getTasks()().length }}</strong> Total
        </span>
        <span class="stat">
          <strong>{{ pendingCount() }}</strong> Pendientes
        </span>
        <span class="stat">
          <strong>{{ completedCount() }}</strong> Completadas
        </span>
      </div>

      <div class="tasks-list" *ngIf="filteredTasks().length > 0">
        <app-task-item
          *ngFor="let task of filteredTasks()"
          [task]="task"
          (toggleComplete)="onToggleComplete($event)"
          (delete)="onDeleteTask($event)"
        />
      </div>

      <div class="empty-state" *ngIf="filteredTasks().length === 0">
        <div class="empty-icon">📋</div>
        <h3>{{ getEmptyMessage() }}</h3>
        <p>{{ getEmptySubtitle() }}</p>
        <button
          *ngIf="currentFilter() === 'all'"
          routerLink="/task/new"
          class="btn-create-empty">
          Crear mi primera tarea
        </button>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 1rem;
      flex-wrap: wrap;
    }

    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }

    .subtitle {
      color: #64748b;
      font-size: 1rem;
      margin: 0;
    }

    .btn-create,
    .btn-create-empty {
      padding: 0.75rem 1.5rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-create:hover,
    .btn-create-empty:hover {
      background: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    }

    .task-stats {
      display: flex;
      gap: 2rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 0.5rem;
      flex-wrap: wrap;
    }

    .stat {
      color: #64748b;
      font-size: 0.875rem;
    }

    .stat strong {
      color: #1e293b;
      font-size: 1.25rem;
      margin-right: 0.25rem;
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: #334155;
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: #64748b;
      margin: 0 0 2rem 0;
    }

    @media (max-width: 640px) {
      .list-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .btn-create {
        width: 100%;
      }

      .task-stats {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class TaskListComponent {
  currentFilter = signal<TaskFilter>('all');

  constructor(public taskService: TaskService) {}

  filteredTasks = computed(() => {
    const tasks = this.taskService.getTasks()();
    const filter = this.currentFilter();

    if (filter === 'all') return tasks;
    if (filter === 'pending') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  });

  pendingCount = computed(() => {
    return this.taskService.getTasks()().filter(t => !t.completed).length;
  });

  completedCount = computed(() => {
    return this.taskService.getTasks()().filter(t => t.completed).length;
  });

  onFilterChange(filter: TaskFilter): void {
    this.currentFilter.set(filter);
  }

  onToggleComplete(taskId: string): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  onDeleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  getEmptyMessage(): string {
    const filter = this.currentFilter();
    if (filter === 'pending') return 'No hay tareas pendientes';
    if (filter === 'completed') return 'No hay tareas completadas';
    return 'No hay tareas';
  }

  getEmptySubtitle(): string {
    const filter = this.currentFilter();
    if (filter === 'pending') return 'Todas tus tareas están completadas';
    if (filter === 'completed') return 'Completa algunas tareas para verlas aquí';
    return 'Comienza creando tu primera tarea';
  }
}
