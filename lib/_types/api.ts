export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
};
