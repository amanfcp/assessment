import React from 'react';
import {CATEGORIES} from '../data';
import {CategoryList} from '../components';

export default function Home() {
  const onSelect = (_categoryIds: number[]) => {
    /** Here you can perform any task such as getting products
     * from API with selected category IDs as filter */
  };

  return <CategoryList categories={CATEGORIES} onSelect={onSelect} />;
}
