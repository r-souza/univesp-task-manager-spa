import { Project } from 'src/app/projects/models/project.model';
import { Priority, Status, User } from 'src/app/shared/models';

export enum TaskStatus {
  New = 1,
  InProgress = 2,
  Done = 3,
}

export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

export class Task {
  id!: number;
  name!: string;
  description?: string;
  completed: boolean = false;
  // tslint:disable-next-line: variable-name
  effective_duration?: number;

  priority_id: number = TaskPriority.Medium;
  status_id: number = TaskStatus.New;
  project_id!: number;
  user_id?: number;
  // tslint:disable-next-line: variable-name
  created_at?: Date;
  // tslint:disable-next-line: variable-name
  updated_at?: Date;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  /**
   * Relations
   */
  priority!: Priority;
  status!: Status;
  project!: Project;
  user!: User;
}
