import { AsyncStorage } from 'async-storage';
import { useState } from 'react';
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

const Onboarding = ({ navigation }) => {
    // State for form inputs and validation
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    // Validate first name (non-empty, alphabetic characters only)
    const validateFirstName = (text) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        setFirstName(text);
        setIsFirstNameValid(nameRegex.test(text.trim()) && text.trim().length > 0);
    };

    // Validate email (standard email format)
    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(text);
        setIsEmailValid(emailRegex.test(text));
    };

    // Handle onboarding completion
    const handleNext = async () => {
        if (isFirstNameValid && isEmailValid) {
            // Save onboarding status
            await AsyncStorage.setItem('@onboarding_completed', 'true');

            // Navigate to Profile screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                {/* Header with Logo and Text */}
                <View style={styles.header}>
                    {/* Logo Placeholder (replace with actual image) */}
                    <View style={styles.logoPlaceholder} />
                    <Text style={styles.headerText}>Little Lemon</Text>
                </View>

                {/* Text Inputs */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='First Name'
                        value={firstName}
                        onChangeText={validateFirstName}
                        autoCapitalize='words'
                        autoCorrect={false}
                        placeholderTextColor='#333'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email Address'
                        value={email}
                        onChangeText={validateEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholderTextColor='#333'
                    />
                </View>

                {/* Next Button */}
                <Button
                    title='Next'
                    onPress={handleNext}
                    disabled={!isFirstNameValid || !isEmailValid}
                    color='#FDB827'
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    logoPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: '#FDB827',
        borderRadius: 8,
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        gap: 15,
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});

export default Onboarding;