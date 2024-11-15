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
import ThemeProvider from '@/providers/ThemeProvider';

// navigation
import { Stack } from "expo-router";
// import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// session
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// functions
import { fetchRandomIdiom } from "@/api/routes/idioms";

// view/header components
import SafeViewAndroid from '@/components/views/SafeViewAndroid';
import SideDrawerMenu from '@/components/menus/SideDrawerMenu';
import MenuHeader from '@/components/headers/MenuHeader';

// fonts
import { useFonts, Nunito_400Regular, Nunito_300Light } from '@expo-google-fonts/nunito';

// types
import { dailyIdiomType } from "@/types/data";

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// remove later
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

type themeString = 'light' | 'dark';

interface IdiomContextProps {
    dailyIdiom: dailyIdiomType;
    setDailyIdiom: Dispatch<SetStateAction<dailyIdiomType>>;
    fetchDailyIdiom: () => Promise<void>;
    sideMenuVisible: boolean;
    setSideMenuVisible: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    session: Session | null;
    setSession: Dispatch<SetStateAction<Session | null>>;
    theme: themeString;
    setTheme: Dispatch<SetStateAction<themeString>>;
}


export const IdiomContext = createContext({} as IdiomContextProps);

export default function RootLayout() {
    // global theme state
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState<themeString>('light');

    // Load the theme preference from AsyncStorage on app start, if DNE, default to colorscheme
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme') as themeString;
                if (storedTheme) {
                    setTheme(storedTheme);
                } else {
                    setTheme(colorScheme as themeString);
                }
            } catch (error) {
                console.log('Error loading theme from AsyncStorage', error);
            }
        };
        loadTheme();
    }, [colorScheme]);

    // side menu state
    const [sideMenuVisible, setSideMenuVisible] = useState<boolean>(false);
    // session
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [session, setSession] = useState<Session | null>(null)

    // check for session on index load
    useEffect(() => {
        // get session defined or undefined
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        // reset session when change auth/user
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        console.log('session set', session);
    }, [])

    // update login status when session changes
    useEffect(() => {
        console.log('session for is logged in',session);
        if (session) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [session]);

    // fonts
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

    // idiom data
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

    const fetchDailyIdiom = async () => {
        // get random idiom for now to test variety of data
        const res = await fetchRandomIdiom();
        setDailyIdiom(res);
        // console.log('fetched random idiom FE', res)
    };

    // dont render if no fonts
    if (!fontsLoaded) {
        return null;
    }

    return (
        // 
        <PaperProvider>
            <IdiomContext.Provider
                value={{
                    dailyIdiom,
                    setDailyIdiom,
                    fetchDailyIdiom,
                    sideMenuVisible,
                    setSideMenuVisible,
                    isLoggedIn,
                    setIsLoggedIn,
                    session,
                    setSession,
                    theme,
                    setTheme
                }}
            >
                <ThemeProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>

                        <BottomSheetModalProvider>
                            <SafeViewAndroid>
                                <SideDrawerMenu />
                                <Stack
                                    screenOptions={{
                                        header: () => <MenuHeader />, // Use the menu header globally
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
                                    <Stack.Screen
                                        name="resetPassword"
                                        options={{
                                            title: "Reset Password",
                                            presentation: 'modal',
                                            headerShown: false
                                        }} />
                                    <Stack.Screen
                                        name="wlgyoGame1"
                                        options={{
                                            title: "WLGYO 1",
                                            // headerShown: false
                                        }} />
                                    <Stack.Screen
                                        name="wlgyoGame2"
                                        options={{
                                            title: "WLGYO 2",
                                            // headerShown: false
                                        }} />
                                    <Stack.Screen
                                        name="wlgyoPostGame"
                                        options={{
                                            title: "WLGYO screen post game",
                                            // headerShown: false
                                        }} />
                                    <Stack.Screen
                                        name="collection"
                                        options={{
                                            title: "Collection",
                                            // headerShown: false
                                        }} />
                                    <Stack.Screen
                                        name="subscribe"
                                        options={{
                                            title: "Subscribe",
                                            headerShown: false
                                        }} />
                                    {/* <Stack.Screen name="settings" options={{ title: "Collection",headerShown: false }} /> */}
                                </Stack>
                            </SafeViewAndroid>
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </ThemeProvider>
            </IdiomContext.Provider>
        </PaperProvider>
    );
}