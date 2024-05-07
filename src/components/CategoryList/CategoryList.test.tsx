// src/components/CategoryList/CategoryList.test.tsx
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import CategoryList from './CategoryList';
import {Text, TouchableOpacity, View} from 'react-native';
import {CategoryItemProps} from '../ui/CategoryItem/CategoryItem.types';
import {SelectedCategoryItemProps} from '../ui/SelectedCategoryItem/SelectedCategoryItem.types';

const MockCategoryItem = ({item, toggleCategory}: CategoryItemProps) => (
  <TouchableOpacity onPress={() => toggleCategory(item.id)}>
    <Text>{item.name}</Text>
  </TouchableOpacity>
);

const MockSelectedCategoryItem = ({
  item,
  removeCategory,
}: SelectedCategoryItemProps) => (
  <View accessibilityLabel={`selected-category-${item.id}`}>
    <Text>{item.name}</Text>
    <TouchableOpacity
      accessibilityLabel={`X-${item.id}`}
      onPress={() => removeCategory(item.id)}>
      <Text>X</Text>
    </TouchableOpacity>
  </View>
);

jest.mock('../ui', () => {
  return {
    CategoryItem: jest
      .fn()
      .mockImplementation(props => <MockCategoryItem {...props} />),
    SelectedCategoryItem: jest
      .fn()
      .mockImplementation(props => <MockSelectedCategoryItem {...props} />),
  };
});

describe('CategoryList', () => {
  const categories = [
    {id: 1, name: 'Category 1', headId: null},
    {id: 2, name: 'Category 2', headId: null},
    {id: 3, name: 'Category 3', headId: null},
  ];

  it('renders without crashing', () => {
    render(<CategoryList categories={categories} onSelect={() => {}} />);
    expect(screen.getByText('Category 1')).toBeTruthy();
    expect(screen.getByText('Category 2')).toBeTruthy();
    expect(screen.getByText('Category 3')).toBeTruthy();
  });

  it('renders the correct number of categories', () => {
    render(<CategoryList categories={categories} onSelect={() => {}} />);
    expect(screen.getAllByText(/Category/i)).toHaveLength(3);
  });

  it('calls onSelect when a category is toggled', () => {
    const onSelectMock = jest.fn();
    render(<CategoryList categories={categories} onSelect={onSelectMock} />);
    fireEvent.press(screen.getByText('Category 1'));
    expect(onSelectMock).toHaveBeenCalled();
  });

  it('should show selected categories when any category is checked', () => {
    render(<CategoryList categories={categories} onSelect={() => {}} />);

    fireEvent.press(screen.getByText('Category 1'));

    const selectedCategory = screen.getByLabelText(`selected-category-1`);

    expect(selectedCategory).toBeTruthy();
  });

  it('calls removeCategory when a category is removed', () => {
    render(<CategoryList categories={categories} onSelect={() => {}} />);
    fireEvent.press(screen.getByText('Category 1'));
    const removeButton = screen.getByLabelText('X-1');
    fireEvent.press(removeButton);
    expect(screen.queryByLabelText('X-1')).toBeNull();
  });

  it('removes a category from selectedCategoryIds if it is already selected', () => {
    render(<CategoryList categories={categories} onSelect={() => {}} />);

    const category = screen.getByText('Category 1');

    fireEvent.press(category); // Select Category 1
    expect(screen.getByLabelText('selected-category-1')).toBeTruthy(); // Check if Category 1 is selected

    fireEvent.press(category); // Select Category 1 again
    expect(screen.queryByLabelText('selected-category-1')).toBeNull(); // Check if Category 1 is no longer selected
  });

  it('should not crash when onSelect is not provided', () => {
    render(<CategoryList categories={categories} />);
    const category = screen.getByText('Category 1');
    fireEvent.press(category);
    expect(screen.getByLabelText('selected-category-1')).toBeTruthy();
  });
});
