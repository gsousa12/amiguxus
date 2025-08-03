interface ApiMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedApiResponse<T> {
  meta: ApiMeta;
  data: T;
}
