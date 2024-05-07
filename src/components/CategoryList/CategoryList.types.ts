import {Category} from '../../types';

export type CategoryListProps = {
  categories: Category[];
  onSelect?: (selectedCategoryIds: number[]) => unknown;
};
