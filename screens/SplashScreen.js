import { Image, StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            {/* Replace with actual logo image */}
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
    },
});

export default SplashScreen;