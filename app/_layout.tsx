import 'react-native-reanimated';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Nunito_400Regular, Nunito_300Light } from '@expo-google-fonts/nunito';
import { useEffect, useState, createContext, Dispatch, SetStateAction } from 'react';
import { Stack } from "expo-router";


import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { fetchRandomIdiom } from "@/api/routes/idioms";
import { dailyIdiomType } from "@/types/data";



// remove later
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

interface IdiomContextProps {
  dailyIdiom: dailyIdiomType;
  setDailyIdiom: Dispatch<SetStateAction<dailyIdiomType>>;
  fetchDailyIdiom: () => Promise<void>
}

export const IdiomContext = createContext({} as IdiomContextProps);

export default function RootLayout() {

  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular
  })
  const [dailyIdiom, setDailyIdiom] = useState<dailyIdiomType>({
    idiom: '',
    idiom_modified: '',
    etymology: '',
    definitions: [],
    keywords: [],
    keywords_pos: [],
    swapword: '',
    swapword_incorrect: '',
    swapword_pos: '',
    swapword_distractors: []
  });

  // 
  const fetchDailyIdiom = async () => {
    // get random idiom for now to test variety of data
    const res = await fetchRandomIdiom();
    setDailyIdiom(res);
    // console.log('fetched random idiom FE', res)
  };

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
      <IdiomContext.Provider
        value={{
          dailyIdiom,
          setDailyIdiom,
          fetchDailyIdiom
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ title: "Home", headerShown: false }} />
              <Stack.Screen
                name="login"
                options={{
                  title: "Login",
                  presentation: 'modal',
                  headerShown: false
                }} />
              <Stack.Screen name="wlgyoGame1" options={{ title: "WLGYO 1", headerShown: false }} />
              <Stack.Screen name="wlgyoGame2" options={{ title: "WLGYO 2", headerShown: false }} />
              <Stack.Screen name="wlgyoPostGame" options={{ title: "WLGYO screen post game", headerShown: false }} />
              <Stack.Screen name="collection" options={{ title: "Collection",headerShown: false }} />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </IdiomContext.Provider>
    </ThemeProvider>
  );
}
