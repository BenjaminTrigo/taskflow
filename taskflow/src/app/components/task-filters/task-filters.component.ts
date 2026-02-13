import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../models/task.model';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filters">
      <button
        *ngFor="let filter of filters"
        [class.active]="filter.value === activeFilter"
        (click)="onFilterChange(filter.value)"
        class="filter-btn">
        {{ filter.label }}
      </button>
    </div>
  `,
  styles: [`
    .filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #64748b;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
  `]
})
export class TaskFiltersComponent {
  filterChange = output<TaskFilter>();
  activeFilter: TaskFilter = 'all';

  filters = [
    { value: 'all' as TaskFilter, label: 'Todas' },
    { value: 'pending' as TaskFilter, label: 'Pendientes' },
    { value: 'completed' as TaskFilter, label: 'Completadas' }
  ];

  onFilterChange(filter: TaskFilter): void {
    this.activeFilter = filter;
    this.filterChange.emit(filter);
  }
}
