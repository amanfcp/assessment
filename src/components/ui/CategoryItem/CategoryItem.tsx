import React from 'react';
import {Text, View} from 'react-native';
import {HierarchicalCategory} from '../../../types';
import CheckBox from '@react-native-community/checkbox';
import styles from './CategoryItem.styles';
import {CategoryItemProps} from './CategoryItem.types';

export default function CategoryItem({
  item,
  toggleCategory,
  selectedCategoryIds,
}: CategoryItemProps) {
  const renderCategoryItem = (currentItem: HierarchicalCategory) => {
    const Item = (
      <View key={`category-${currentItem.id}`} style={styles.item}>
        <CheckBox
          accessibilityLabel={`category-${currentItem.id}-checkbox`}
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

    if (!currentItem.subCategories.length) {
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
