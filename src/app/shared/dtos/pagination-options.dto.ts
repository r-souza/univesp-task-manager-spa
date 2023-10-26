export interface PaginationOptionsDto {
  filter?: string;
  sortColumn?: string;
  sortOrder?: 'asc' | 'desc' | '';
  page?: number;
  limit?: number;
}
