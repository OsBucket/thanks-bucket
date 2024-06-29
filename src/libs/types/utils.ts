export interface ResponseWithPagination<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sortable;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sortable;
  offset: number;
  paged: number;
  unpaged: number;
}

interface Sortable {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
