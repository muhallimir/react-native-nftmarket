import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WalletScreen from "./screens/WalletScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import { BidsProvider } from "./contexts/BidsContext";
import { WalletProvider } from "./contexts/WalletContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { OnboardingProvider, useOnboarding } from "./contexts/OnboardingContext";
import { ChainProvider } from "./contexts/ChainContext";
import { FilterProvider } from "./contexts/FilterContext";
import { ReportsProvider } from "./contexts/ReportsContext";

const Stack = createStackNavigator();

const ThemedNavigator = () => {
  const { colors } = useTheme();
  const { done, hydrated } = useOnboarding();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.divider,
      primary: colors.primary,
    },
  };
  const initialRoute = hydrated && !done ? "Onboarding" : "Home";
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <FilterProvider>
        <ChainProvider>
          <OnboardingProvider>
            <ProfileProvider>
              <WalletProvider>
                <ReportsProvider>
                  <BidsProvider>
                    <RecentlyViewedProvider>
                      <FavoritesProvider>
                        <ThemedNavigator />
                      </FavoritesProvider>
                    </RecentlyViewedProvider>
                  </BidsProvider>
                </ReportsProvider>
              </WalletProvider>
            </ProfileProvider>
          </OnboardingProvider>
        </ChainProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
