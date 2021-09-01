import { Image } from "./Image.ts";

export interface PortfolioItem {
  id: string;
  image: Image;
  title: string;
  description: string;
}
