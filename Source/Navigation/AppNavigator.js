import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import { useEffect, useState } from "react";
import SplashScreen from "../Screen/SplashScreen";
import InActiveScreen from "../Screen/InActiveScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        // Show splash screen for at least 3 seconds
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isSplashVisible && (
                    <Stack.Screen name='SplashScreen' component={SplashScreen} />
                )}
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    component={DrawerNavigator}
                />
                <Stack.Screen
                    name="InActiveScreen"
                    options={{ headerShown: false }}
                    component={InActiveScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}