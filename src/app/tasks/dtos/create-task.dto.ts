export class CreateTaskDto {
  name!: string;
  description?: string;
  completed!: boolean;
  priority_id!: number;
  status_id!: number;
  project_id!: number;
  user_id!: number;
}
