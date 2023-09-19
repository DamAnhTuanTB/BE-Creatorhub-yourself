interface PagingParms {
  limit?: number;
  page?: number;
}

interface PaginResponse<T> {
  items: T;
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
  paging: boolean;
}
