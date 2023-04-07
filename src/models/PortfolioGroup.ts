import { PortfolioItem } from "./PortfolioItem.ts";

export interface PortfolioGroup {
  id: string;
  items: PortfolioItem[];
  tags: string[];
  title?: string;
  visible?: boolean;
}
