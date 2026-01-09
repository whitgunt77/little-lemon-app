import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

const Banner = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search input by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearchChange]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/little-lemon-banner.jpg')}
        style={styles.bannerImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>
        <Text style={styles.description}>
          We are a family-owned Mediterranean restaurant, focused on traditional recipes served with modern flair.
        </Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search dishes..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#333"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FDB827',
    borderBottomWidth: 1,
    borderBottomColor: '#E56B2F',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  textContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
});

export default Banner;