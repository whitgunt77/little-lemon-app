import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Categories = ({ categories, selectedCategories, onToggleCategory }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategories.includes(item) && styles.selectedCategory,
      ]}
      onPress={() => onToggleCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategories.includes(item) && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FDB827',
  },
  selectedCategory: {
    backgroundColor: '#FDB827',
    borderColor: '#FDB827',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#333',
  },
});

export default Categories;