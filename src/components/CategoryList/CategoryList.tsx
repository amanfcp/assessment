import React, {useMemo, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Category, HierarchicalCategory} from '../../types';
import {GENERAL_CONSTANTS} from '../../constants';
import {CategoryItem, SelectedCategoryItem} from '../ui';
import {buildCategoryTree} from '../../util';
import styles from './CategoryList.styles';
import {CategoryListProps} from './CategoryList.types';

export default function CategoryList({
  categories,
  onSelect,
}: CategoryListProps) {
  const [selectedCategoryIds, setSelectedCategories] = useState<number[]>([]);

  const hierarchicalCategories: HierarchicalCategory[] = useMemo(
    () => buildCategoryTree(categories, null),
    [categories],
  );

  const selectedCategories = categories.filter(cat =>
    selectedCategoryIds.includes(cat.id),
  );

  const toggleCategory = (id: number) => {
    let updatedSelectedCategoryIds = [];
    if (selectedCategoryIds.includes(id)) {
      updatedSelectedCategoryIds = selectedCategoryIds.filter(
        item => item !== id,
      );
    } else {
      updatedSelectedCategoryIds = [...selectedCategoryIds, id];
    }
    setSelectedCategories(updatedSelectedCategoryIds);
    if (onSelect) {
      onSelect(updatedSelectedCategoryIds);
    }
  };

  const removeCategory = (id: number) => {
    setSelectedCategories(selectedCategoryIds.filter(item => item !== id));
  };

  const renderCategoryItem = ({item}: {item: HierarchicalCategory}) => (
    <CategoryItem
      item={item}
      toggleCategory={toggleCategory}
      selectedCategoryIds={selectedCategoryIds}
    />
  );

  const renderSelectedCategoryItem = ({item}: {item: Category}) => (
    <SelectedCategoryItem item={item} removeCategory={removeCategory} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hierarchicalCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
      />
      {!selectedCategoryIds.length ? null : (
        <View style={styles.selectedCategories}>
          <Text style={styles.selectedCategoriesLabel}>
            {GENERAL_CONSTANTS.SELECTED_CATEGORIES}
          </Text>
          <FlatList
            horizontal
            data={selectedCategories}
            renderItem={renderSelectedCategoryItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
}
