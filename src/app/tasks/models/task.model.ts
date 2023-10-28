import { Project } from 'src/app/projects/models/project.model';
import { Priority, Status, User } from 'src/app/shared/models';

export class Task {
  id!: number;
  name!: string;
  description?: string;
  completed: boolean = false;

  priotity_id!: number;
  status_id!: number;
  project_id!: number;
  user_id!: number;
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
