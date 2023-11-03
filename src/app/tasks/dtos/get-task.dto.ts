import { Task } from '../models/task.model';

export class GetTaskDto {
  data!: { [key: string]: Task };
}
