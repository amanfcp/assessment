import {Category} from '../../../types';

export type SelectedCategoryItemProps = {
  item: Category;
  removeCategory: (categoryId: number) => void;
};
