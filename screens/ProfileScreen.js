import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaskInput from 'react-native-masked-text';

const ProfileScreen = ({ navigation }) => {
  // State for user data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUri, setAvatarUri] = useState(null);
  const [promotions, setPromotions] = useState(false);
  const [news, setNews] = useState(false);
  const [offers, setOffers] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedFirstName = await AsyncStorage.getItem('@firstName');
        const savedLastName = await AsyncStorage.getItem('@lastName');
        const savedEmail = await AsyncStorage.getItem('@email');
        const savedPhone = await AsyncStorage.getItem('@phoneNumber');
        const savedAvatar = await AsyncStorage.getItem('@avatarUri');
        const savedPromotions = await AsyncStorage.getItem('@promotions');
        const savedNews = await AsyncStorage.getItem('@news');
        const savedOffers = await AsyncStorage.getItem('@offers');

        setFirstName(savedFirstName || '');
        setLastName(savedLastName || '');
        setEmail(savedEmail || '');
        setPhoneNumber(savedPhone || '');
        setAvatarUri(savedAvatar || null);
        setPromotions(savedPromotions === 'true');
        setNews(savedNews === 'true');
        setOffers(savedOffers === 'true');
      } catch (e) {
        console.error('Error loading profile data:', e);
        Alert.alert('Error', 'Failed to load profile data.');
      }
    };

    loadProfileData();
  }, []);

  // Request camera/media library permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Sorry, we need camera roll permissions to pick images!'
          );
        }
      }
    })();
  }, []);

  // Select profile image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  // Save all changes to AsyncStorage
  const saveChanges = async () => {
    try {
      await AsyncStorage.setItem('@firstName', firstName);
      await AsyncStorage.setItem('@lastName', lastName);
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@phoneNumber', phoneNumber);
      await AsyncStorage.setItem('@avatarUri', avatarUri || '');
      await AsyncStorage.setItem('@promotions', promotions.toString());
      await AsyncStorage.setItem('@news', news.toString());
      await AsyncStorage.setItem('@offers', offers.toString());

      Alert.alert('Success', 'Changes saved successfully!');
    } catch (e) {
        console.error('Error saving changes.', e);
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  // Clear data and logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } catch (e) {
      console.error('Error Failed to logout.', e);
      Alert.alert('Error', 'Failed to logout.');
    }
  };

  // Generate initials for placeholder
  const getInitials = () => {
    const firstInitial = firstName?.charAt(0) || '';
    const lastInitial = lastName?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity disabled style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Image */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.initials}>{getInitials() || '?'}</Text>
          </View>
        )}
        <Text style={styles.avatarLabel}>Change Photo</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <MaskInput
        style={styles.input}
        mask="(000) 000-0000"
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#333"
      />

      {/* Checkboxes */}
      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setPromotions(!promotions)}
        >
          <View
            style={[
              styles.checkboxCircle,
              promotions && styles.checkboxChecked,
            ]}
          >
            {promotions && <Text style={styles.checkboxTick}>✓</Text>}
          </View>
          <Text>Promotions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setNews(!news)}
        >
          <View style={[styles.checkboxCircle, news && styles.checkboxChecked]}>
            {news && <Text style={styles.checkboxTick}>✓</Text>}
          </View>
          <Text>News</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setOffers(!offers)}
        >
          <View style={[styles.checkboxCircle, offers && styles.checkboxChecked]}>
            {offers && <Text style={styles.checkboxTick}>✓</Text>}
          </View>
          <Text>Offers</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <Button title="Save Changes" onPress={saveChanges} />
      <Button title="Logout" onPress={handleLogout} color="#ff4444" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    opacity: 0.5,
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDB827', // Little Lemon orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  initials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarLabel: {
    color: '#FDB827',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkboxCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FDB827',
    borderColor: '#FDB827',
  },
  checkboxTick: {
    fontSize: 12,
    color: '#333',
  },
});

export default ProfileScreen;