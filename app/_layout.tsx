import 'react-native-reanimated';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Nunito_400Regular, Nunito_300Light } from '@expo-google-fonts/nunito';
import { useEffect } from 'react';
import { Stack } from "expo-router";

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// remove later
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="login"
              options={{
                presentation: 'modal',
                headerShown: false
              }} />
            <Stack.Screen name="wlgyoGame1" options={{ headerShown: false }} />
            <Stack.Screen name="wlgyoGame2" options={{ headerShown: false }} />
            <Stack.Screen name="wlgyoPostGame" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
