import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Nunito_400Regular, Nunito_300Light } from '@expo-google-fonts/nunito';
import { useEffect } from 'react';
import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular
  })

  useEffect(() => {
    // only hide (proceed) from splash screen after fonts loaded
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme: DefaultTheme}>
    // {/* <ThemeProvider value={DarkTheme}> */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    // </ThemeProvider>
  );
}
