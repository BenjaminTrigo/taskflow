export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type TaskFilter = 'all' | 'pending' | 'completed';
