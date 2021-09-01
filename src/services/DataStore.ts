export interface DataStore<T, TKey, TFilters> {
  search: (filters?: TFilters) => Promise<T[]>;
  getItem: (key: TKey) => Promise<T>;
  save: (item: T) => Promise<T>;
  deleteItem: (item: T) => Promise<T>;
}
