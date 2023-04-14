export interface NavLink {
  id: number;
  iconName?: string;
  iconSet?: string;
  iconSubSet?: string;
  isExternal?: boolean;
  title: string;
  url: string;
  usingExactMatch?: boolean;
}
