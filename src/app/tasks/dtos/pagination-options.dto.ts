export interface PaginationOptionsDto {
  filter?: string;
  sortColumn?: string;
  sortOrder?: 'asc' | 'desc' | '';
  page?: number;
  limit?: number;
  projectId?: number | null;
  userId?: number | null;
  statusId?: number | null;
  priorityId?: number | null;
}
