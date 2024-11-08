import 'react-native-reanimated';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

// react
import { useEffect, useState, createContext, Dispatch, SetStateAction } from 'react';
import { useColorScheme } from 'react-native';

// providers
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PaperProvider } from 'react-native-paper';


// navigation
import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// functions
import { fetchRandomIdiom } from "@/api/routes/idioms";

// view/header components
import SafeViewAndroid from '@/components/views/SafeViewAndroid';
import OptionsHeader from '@/components/views/OptionsHeader';

// fonts
import { useFonts, Nunito_400Regular, Nunito_300Light } from '@expo-google-fonts/nunito';

// types
import { dailyIdiomType } from "@/types/data";

// remove later
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

interface IdiomContextProps {
    dailyIdiom: dailyIdiomType;
    setDailyIdiom: Dispatch<SetStateAction<dailyIdiomType>>;
    fetchDailyIdiom: () => Promise<void>;
    sideMenuVisible: boolean,
    setSideMenuVisible: Dispatch<SetStateAction<boolean>>,
}

export const IdiomContext = createContext({} as IdiomContextProps);

export default function RootLayout() {

    const colorScheme = useColorScheme();
    const [sideMenuVisible, setSideMenuVisible] = useState<boolean>(false);
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
                    fetchDailyIdiom,
                    sideMenuVisible,
                    setSideMenuVisible
                }}
            >
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <PaperProvider>
                        <BottomSheetModalProvider>
                            <SafeViewAndroid>
                                <Stack
                                    screenOptions={{
                                        header: () => <OptionsHeader />, // Use the custom header globally
                                    }}
                                >
                                    <Stack.Screen
                                        name="index"
                                        options={{
                                            title: "Home",
                                            // headerShown: false 
                                        }} />
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
                                    <Stack.Screen name="collection" options={{ title: "Collection", headerShown: false }} />
                                    {/* <Stack.Screen name="settings" options={{ title: "Collection",headerShown: false }} /> */}
                                </Stack>
                            </SafeViewAndroid>
                        </BottomSheetModalProvider>
                    </PaperProvider>
                </GestureHandlerRootView>
            </IdiomContext.Provider>
        </ThemeProvider>
    );
}