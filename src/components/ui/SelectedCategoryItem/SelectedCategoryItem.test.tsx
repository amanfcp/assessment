import * as React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import SelectedCategoryItem from './SelectedCategoryItem';

describe('SelectedCategoryItem', () => {
  const item = {
    id: 1,
    name: 'Phones',
    headId: null,
  };

  const removeCategory = jest.fn();

  it('renders correctly', () => {
    render(
      <SelectedCategoryItem item={item} removeCategory={removeCategory} />,
    );

    expect(screen.getByText('Phones')).toBeTruthy();
  });

  it('calls removeCategory when remove button is pressed', () => {
    render(
      <SelectedCategoryItem item={item} removeCategory={removeCategory} />,
    );

    fireEvent.press(screen.getByText('X'));
    expect(removeCategory).toHaveBeenCalledWith(item.id);
  });
});
