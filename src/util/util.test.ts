import {buildCategoryTree} from './index';
import {Category, HierarchicalCategory} from '../types';

describe('buildCategoryTree', () => {
  it('should return an empty array when given an empty categories array', () => {
    const categories: Category[] = [];
    const result: HierarchicalCategory[] = buildCategoryTree(categories, null);
    expect(result).toEqual([]);
  });

  it('should return a single category when given a single category', () => {
    const categories: Category[] = [{id: 1, name: 'Category 1', headId: null}];
    const result: HierarchicalCategory[] = buildCategoryTree(categories, null);
    expect(result).toEqual([
      {id: 1, name: 'Category 1', headId: null, subCategories: []},
    ]);
  });

  it('should build a hierarchical category tree from a flat list of categories', () => {
    const categories: Category[] = [
      {id: 1, name: 'Category 1', headId: null},
      {id: 2, name: 'Category 2', headId: 1},
      {id: 3, name: 'Category 3', headId: 1},
      {id: 4, name: 'Category 4', headId: 2},
      {id: 5, name: 'Category 5', headId: 4},
    ];
    const result: HierarchicalCategory[] = buildCategoryTree(categories, null);
    expect(result).toEqual([
      {
        id: 1,
        name: 'Category 1',
        headId: null,
        subCategories: [
          {
            id: 2,
            name: 'Category 2',
            headId: 1,
            subCategories: [
              {
                id: 4,
                name: 'Category 4',
                headId: 2,
                subCategories: [
                  {
                    id: 5,
                    name: 'Category 5',
                    headId: 4,
                    subCategories: [],
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: 'Category 3',
            headId: 1,
            subCategories: [],
          },
        ],
      },
    ]);
  });
});
