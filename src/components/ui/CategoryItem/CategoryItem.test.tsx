import * as React from 'react';
import CategoryItem from './CategoryItem';
import {HierarchicalCategory} from '../../../types';
import {fireEvent, render, screen} from '@testing-library/react-native';

describe('CategoryItem', () => {
  const item: HierarchicalCategory = {
    id: 1,
    name: 'Phones',
    headId: null,
    description: '',
    subCategories: [],
  };

  it(`renders correctly`, () => {
    const tree = render(
      <CategoryItem
        item={item}
        selectedCategoryIds={[]}
        toggleCategory={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the category name correctly', () => {
    render(
      <CategoryItem
        item={item}
        selectedCategoryIds={[]}
        toggleCategory={jest.fn()}
      />,
    );

    expect(screen.getByText('Phones')).toBeTruthy();
  });

  it('calls toggleCategory when clicked', () => {
    const toggleCategory = jest.fn();

    render(
      <CategoryItem
        item={item}
        selectedCategoryIds={[]}
        toggleCategory={toggleCategory}
      />,
    );

    fireEvent(
      screen.getByLabelText(`category-${item.id}-checkbox`),
      'onValueChange',
      {nativeEvent: {}},
    );
    expect(toggleCategory).toHaveBeenCalled();
  });

  it('is selected when its ID is in selectedCategoryIds', () => {
    render(
      <CategoryItem
        item={item}
        selectedCategoryIds={[1]}
        toggleCategory={jest.fn()}
      />,
    );

    const checkbox = screen.getByLabelText(`category-${item.id}-checkbox`);
    expect(checkbox.props.value).toBeTruthy();
  });

  it('should render a category with a subcategory', () => {
    item.subCategories = [
      {
        id: 2,
        name: 'iPhone',
        headId: 1,
        description: '',
        subCategories: [],
      },
    ];

    render(
      <CategoryItem
        item={item}
        selectedCategoryIds={[]}
        toggleCategory={jest.fn()}
      />,
    );
    const subCategory = screen.getByText('iPhone');
    expect(subCategory).toBeTruthy();
  });
});
