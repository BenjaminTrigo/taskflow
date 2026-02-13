import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="task-item" [class.completed]="task().completed">
      <div class="task-header">
        <div class="task-title-section">
          <input
            type="checkbox"
            [checked]="task().completed"
            (change)="toggleComplete.emit(task().id)"
            class="task-checkbox"
            [id]="'task-' + task().id"
          />
          <label [for]="'task-' + task().id" class="task-title">
            {{ task().title }}
          </label>
        </div>
        <span class="priority-badge" [class]="'priority-' + task().priority">
          {{ getPriorityLabel(task().priority) }}
        </span>
      </div>

      <p class="task-description" *ngIf="task().description">
        {{ truncateDescription(task().description) }}
      </p>

      <div class="task-footer">
        <span class="task-date">
          {{ formatDate(task().createdAt) }}
        </span>
        <div class="task-actions">
          <button
            [routerLink]="['/task', task().id]"
            class="btn btn-edit">
            Editar
          </button>
          <button
            (click)="onDelete()"
            class="btn btn-delete">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-item {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      padding: 1.25rem;
      transition: all 0.2s;
    }

    .task-item:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-color: #cbd5e1;
    }

    .task-item.completed {
      opacity: 0.7;
      background: #f8fafc;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .task-title-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
    }

    .task-checkbox {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
      accent-color: #3b82f6;
    }

    .task-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      cursor: pointer;
      flex: 1;
    }

    .task-item.completed .task-title {
      text-decoration: line-through;
      color: #94a3b8;
    }

    .priority-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-low {
      background: #dbeafe;
      color: #1e40af;
    }

    .priority-medium {
      background: #fef3c7;
      color: #92400e;
    }

    .priority-high {
      background: #fee2e2;
      color: #991b1b;
    }

    .task-description {
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 1rem 2rem;
    }

    .task-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .task-date {
      color: #94a3b8;
      font-size: 0.75rem;
    }

    .task-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.375rem 0.875rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-edit {
      background: #3b82f6;
      color: white;
    }

    .btn-edit:hover {
      background: #2563eb;
    }

    .btn-delete {
      background: #ef4444;
      color: white;
    }

    .btn-delete:hover {
      background: #dc2626;
    }
  `]
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggleComplete = output<string>();
  delete = output<string>();

  getPriorityLabel(priority: string): string {
    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    };
    return labels[priority as keyof typeof labels] || priority;
  }

  truncateDescription(description: string | undefined): string {
    if (!description) return '';
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  onDelete(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.delete.emit(this.task().id);
    }
  }
}
