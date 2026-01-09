import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from 'async-storage';
import { useEffect, useState } from 'react';
import Onboarding from './screens/Onboarding';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const value = await AsyncStorage.getItem('@onboarding_completed');
                setIsOnboardingCompleted(!!value);
            } catch (e) {
                console.error('Failed to fetch onboarding status', e);
            } finally {
                setIsLoading(false);
            }
        };
        checkOnboardingStatus();
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isOnboardingCompleted ? (
                    <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;