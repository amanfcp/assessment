import {StyleSheet} from 'react-native';

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
});

export default styles;
