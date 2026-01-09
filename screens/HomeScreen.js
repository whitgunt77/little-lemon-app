import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { fetchCategories, filterMenu } from '../utils/database';

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load categories and initial menu
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories || []);
        const initialMenu = await filterMenu([], '');
        setMenuItems(initialMenu);
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Apply filters when selections or search change
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      try {
        const filteredMenu = await filterMenu(selectedCategories, searchTerm);
        setMenuItems(filteredMenu);
      } finally {
        setIsLoading(false);
      }
    };
    applyFilters();
  }, [selectedCategories, searchTerm]);

  const handleToggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>${item.price.toFixed(2)}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FDB827" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Banner onSearchChange={setSearchTerm} />
      <Categories
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
});

export default HomeScreen;