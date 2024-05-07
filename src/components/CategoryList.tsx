import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Category, HierarchicalCategory} from '../types';
import {GENERAL_CONSTANTS} from '../constants';
import {CategoryItem} from './ui';
import {buildCategoryTree} from '../util';

type CategoryListProps = {
  categories: Category[];
  onSelect?: (selectedCategoryIds: number[]) => unknown;
};

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

  const removeCategory = (category: Category) => {
    setSelectedCategories(
      selectedCategoryIds.filter(item => item !== category.id),
    );
  };
  const renderCategoryItem = ({item}: {item: HierarchicalCategory}) => (
    <CategoryItem
      item={item}
      toggleCategory={toggleCategory}
      selectedCategoryIds={selectedCategoryIds}
    />
  );

  const renderSelectedCategoryItem = ({item}: {item: Category}) => (
    <View style={styles.selectedCategory}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => removeCategory(item)}>
        <Text style={styles.removeIcon}>X</Text>
      </TouchableOpacity>
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 12,
  },
  description: {
    fontSize: 10,
    marginLeft: 4,
  },
  subcategories: {
    marginLeft: 12,
  },
  selectedCategories: {
    marginTop: 12,
  },
  selectedCategoriesLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  selectedCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  removeIcon: {
    marginLeft: 5,
    color: 'red',
  },
});
