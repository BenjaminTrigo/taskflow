import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h1>{{ isEditMode ? 'Editar Tarea' : 'Nueva Tarea' }}</h1>
        <button (click)="goBack()" class="btn-back">
          Volver
        </button>
      </div>

      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="task-form">
        <div class="form-group">
          <label for="title">
            Título <span class="required">*</span>
          </label>
          <input
            id="title"
            type="text"
            formControlName="title"
            placeholder="Escribe el título de la tarea"
            class="form-control"
            [class.invalid]="isFieldInvalid('title')"
          />
          <div class="error-message" *ngIf="isFieldInvalid('title')">
            <span *ngIf="taskForm.get('title')?.errors?.['required']">
              El título es obligatorio
            </span>
            <span *ngIf="taskForm.get('title')?.errors?.['minlength']">
              El título debe tener al menos 3 caracteres
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea
            id="description"
            formControlName="description"
            placeholder="Describe la tarea (opcional)"
            rows="4"
            class="form-control"
            [class.invalid]="isFieldInvalid('description')"
          ></textarea>
          <div class="char-counter">
            {{ taskForm.get('description')?.value?.length || 0 }} / 200
          </div>
          <div class="error-message" *ngIf="isFieldInvalid('description')">
            <span *ngIf="taskForm.get('description')?.errors?.['maxlength']">
              La descripción no puede exceder los 200 caracteres
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="priority">
            Prioridad <span class="required">*</span>
          </label>
          <select
            id="priority"
            formControlName="priority"
            class="form-control"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div class="form-actions">
          <button
            type="button"
            (click)="goBack()"
            class="btn btn-cancel">
            Cancelar
          </button>
          <button
            type="submit"
            [disabled]="taskForm.invalid"
            class="btn btn-submit">
            {{ isEditMode ? 'Actualizar' : 'Guardar' }} Tarea
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 1.875rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .btn-back {
      padding: 0.5rem 1rem;
      background: #f1f5f9;
      color: #475569;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-back:hover {
      background: #e2e8f0;
    }

    .task-form {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: #334155;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .required {
      color: #ef4444;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s;
      box-sizing: border-box;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-control.invalid {
      border-color: #ef4444;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .char-counter {
      text-align: right;
      font-size: 0.75rem;
      color: #94a3b8;
      margin-top: 0.25rem;
    }

    .error-message {
      margin-top: 0.5rem;
      color: #ef4444;
      font-size: 0.875rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: flex-end;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-cancel {
      background: #f1f5f9;
      color: #475569;
    }

    .btn-cancel:hover {
      background: #e2e8f0;
    }

    .btn-submit {
      background: #3b82f6;
      color: white;
    }

    .btn-submit:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-submit:disabled {
      background: #cbd5e1;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId?: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['medium', Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  private loadTask(id: string): void {
    const task = this.taskService.getTaskById(id);
    if (task) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description || '',
        priority: task.priority
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, {
          title: formValue.title,
          description: formValue.description || undefined,
          priority: formValue.priority
        });
      } else {
        this.taskService.addTask({
          title: formValue.title,
          description: formValue.description || undefined,
          priority: formValue.priority,
          completed: false
        });
      }

      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
