import {HierarchicalCategory} from '../../../types';

export type CategoryItemProps = {
  item: HierarchicalCategory;
  toggleCategory: (id: number) => void;
  selectedCategoryIds: number[];
};
