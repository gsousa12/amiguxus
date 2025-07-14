export type PaginationMeta = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export type ApiResponse<T extends Record<string, any>> = {
  data: T;
  pagination?: PaginationMeta;
};

export function createApiResponse<T extends Record<string, any>>(
  data: T,
  pagination?: PaginationMeta,
): ApiResponse<T> {
  const response: any = {};

  if (pagination) {
    response.pagination = pagination;
  }

  response.data = data;

  return response;
}
