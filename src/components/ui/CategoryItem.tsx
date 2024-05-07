import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HierarchicalCategory} from '../../types';
import CheckBox from '@react-native-community/checkbox';

type CategoryItemProps = {
  item: HierarchicalCategory;
  toggleCategory: (id: number) => void;
  selectedCategoryIds: number[];
};

export default function CategoryItem({
  item,
  toggleCategory,
  selectedCategoryIds,
}: CategoryItemProps) {
  const renderCategoryItem = (currentItem: HierarchicalCategory) => {
    const Item = (
      <View key={`category-${currentItem.id}`} style={styles.item}>
        <CheckBox
          value={selectedCategoryIds.some(cat => cat === currentItem.id)}
          onValueChange={() => toggleCategory(currentItem.id)}
        />
        <View>
          <Text>{currentItem.name}</Text>
          {currentItem.description && (
            <Text style={styles.description}>{currentItem.description}</Text>
          )}
        </View>
      </View>
    );

    if (currentItem.subCategories.length === 0) {
      return Item;
    }

    return (
      <View key={`category-${currentItem.id}`}>
        {Item}
        <View style={styles.subcategories}>
          {currentItem.subCategories.map(subcategory =>
            renderCategoryItem(subcategory),
          )}
        </View>
      </View>
    );
  };

  return renderCategoryItem(item);
}

const styles = StyleSheet.create({
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
});
