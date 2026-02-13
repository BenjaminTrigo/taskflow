import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'taskflow_tasks';
  private tasksSignal = signal<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  getTasks() {
    return this.tasksSignal.asReadonly();
  }

  private loadTasks(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const tasks: Task[] = JSON.parse(stored);
        tasks.forEach(task => {
          task.createdAt = new Date(task.createdAt);
          if (task.updatedAt) {
            task.updatedAt = new Date(task.updatedAt);
          }
        });
        this.tasksSignal.set(tasks);
      } catch (error) {
        console.error('Error loading tasks from localStorage', error);
        this.tasksSignal.set([]);
      }
    }
  }

  private saveTasks(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasksSignal()));
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
    this.saveTasks();
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    let updatedTask: Task | null = null;
    this.tasksSignal.update(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          updatedTask = {
            ...task,
            ...updates,
            updatedAt: new Date()
          };
          return updatedTask;
        }
        return task;
      })
    );
    if (updatedTask) {
      this.saveTasks();
    }
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasksSignal().length;
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
    const deleted = initialLength !== this.tasksSignal().length;
    if (deleted) {
      this.saveTasks();
    }
    return deleted;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find(task => task.id === id);
  }

  toggleTaskCompletion(id: string): Task | null {
    let toggledTask: Task | null = null;
    this.tasksSignal.update(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          toggledTask = {
            ...task,
            completed: !task.completed,
            updatedAt: new Date()
          };
          return toggledTask;
        }
        return task;
      })
    );
    if (toggledTask) {
      this.saveTasks();
    }
    return toggledTask;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
