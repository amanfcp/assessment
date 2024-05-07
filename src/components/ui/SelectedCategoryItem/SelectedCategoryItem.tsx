import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './SelectedCategoryItem.styles';
import {SelectedCategoryItemProps} from './SelectedCategoryItem.types';

export default function SelectedCategoryItem({
  item,
  removeCategory,
}: SelectedCategoryItemProps) {
  return (
    <View style={styles.selectedCategory}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => removeCategory(item.id)}>
        <Text style={styles.removeIcon}>X</Text>
      </TouchableOpacity>
    </View>
  );
}
