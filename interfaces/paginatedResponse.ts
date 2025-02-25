export interface PaginatedResponse<T> {
  limit: number;
  products: Array<T>;
  skip: number;
  total: number;
}
