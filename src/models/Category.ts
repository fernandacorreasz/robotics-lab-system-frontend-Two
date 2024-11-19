import { SubCategory } from './SubCategory';

export interface Category {
  id: string
  categoryId: string;
  categoryName: string;
  subcategories: SubCategory[];
}
