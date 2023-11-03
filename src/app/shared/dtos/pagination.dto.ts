export interface PaginationDto<T> {
  data: T[];

  meta: {
    total: number;
    itemCount: number;
    per_page: number;
    totalPages: number;
    current_page: number;
  };

  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
