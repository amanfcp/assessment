import {Category, HierarchicalCategory} from '../types';

export function buildCategoryTree(
  categories: Category[],
  parentId: number | null,
): HierarchicalCategory[] {
  const filteredCategories = categories.filter(cat => cat.headId === parentId);

  return filteredCategories.map(category => ({
    ...category,

    subCategories: buildCategoryTree(categories, category.id || null),
  }));
}
