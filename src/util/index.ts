import {Category, HierarchicalCategory} from '../types';

/**
 * Recursively builds a hierarchical category tree from a flat list of categories.
 * Each category can have sub-categories, forming a tree structure.
 *
 * @param {Category[]} categories - The flat list of categories to be transformed into a tree.
 * @param {number | null} parentId - The ID of the parent category. Use null for the root categories.
 * @returns {HierarchicalCategory[]} - The hierarchical category tree.
 */
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
