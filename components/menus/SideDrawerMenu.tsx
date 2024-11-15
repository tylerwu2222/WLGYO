import { useState, useContext } from 'react';
import { StyleSheet, Dimensions, useColorScheme } from 'react-native';


import { Portal, Modal, Drawer } from 'react-native-paper';
import { MotiView, View } from 'moti';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
// import { HomeContext } from '@/app/home';
import { IdiomContext } from '@/app/_layout';
// import { signOutUser } from '@/src/providers/UserProvider/UserProvider';

import { Link, useRouter } from 'expo-router';
import ToggleSwitch from '../inputs/switches/ToggleSwitch';
import { ThemeContext } from '@/providers/ThemeProvider';
import ThemedText from '../typography/ThemedText';

const SideDrawerMenu = () => {
    const router = useRouter();
    const topOffset = 60;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // track 
    const [active, setActive] = useState('');
    const {
        sideMenuVisible,
        setSideMenuVisible,
        isLoggedIn,
        setIsLoggedIn,
        theme,
        setTheme } = useContext(IdiomContext);
    const [darkModeOn, setDarkModeOn] = useState<boolean>(theme === 'dark');

    // console.log('color scheme', theme);

    // themed styles
    const {
        backgroundColor,
        textColor,
        tintTextColor,
        errorTextColor,
        textHighlightColor
    } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        sideDrawerMenuModal: {
            display: 'flex',
            justifyContent: 'flex-start'
        },
        sideDrawerMenu: {
            position: 'absolute',
            top: topOffset,
            left: 0,
            borderTopRightRadius: 40,
            // borderBottomRightRadius: 40,
            height: screenHeight - topOffset,
            width: screenWidth / 2,
            paddingVertical: 20,
            backgroundColor: backgroundColor
        }
    });

    const toggleDarkMode = () => {
        // toggle switch
        setDarkModeOn(!darkModeOn);
        // then toggle color scheme
        theme === 'dark' ? setTheme('light') : setTheme('dark');
    }
    const handleLogin = () => {
        // navigate to login
        router.navigate('/login');
        setSideMenuVisible(false);
    };

    const handleLogout = () => {
        // sign out user and navigate to home page
        setIsLoggedIn(false);
        router.navigate('/')
        setSideMenuVisible(false);
    };

    // console.log('is logged in in side drawer', isLoggedIn);

    return (
        <Portal>
            <Modal
                visible={sideMenuVisible}
                onDismiss={() => setSideMenuVisible(false)}
                style={styles.sideDrawerMenuModal}
            >
                <MotiView
                    key="sideMenu"
                    from={{
                        translateX: -screenWidth / 2,
                        // width: magpieDimensions.vw
                    }}
                    animate={{
                        translateX: 0,
                        // width: magpieDimensions.vw/2
                    }}
                    exit={{
                        translateX: -screenWidth / 2,
                    }}
                    transition={{
                        type: 'timing'
                    }}
                    style={styles.sideDrawerMenu}
                >
                    <Drawer.Section >
                        <Link href="/settings" asChild>
                            <Drawer.Item
                                label="Settings"
                                icon='cog'
                                theme={{
                                    colors: {
                                        onSurfaceVariant: textColor,
                                        secondaryContainer: textHighlightColor // active, highlight color
                                    }
                                }}
                                // active={active === 'first'}
                                onPress={() => setSideMenuVisible(false)}
                            />
                        </Link>
                        <Drawer.Item
                            label={darkModeOn ? 'Dark mode: ON' : 'Dark mode: OFF'}
                            active={darkModeOn}
                            theme={{
                                colors: {
                                    onSurfaceVariant: textColor,
                                    onSecondaryContainer: textColor,
                                    secondaryContainer: textHighlightColor
                                }
                            }}
                            onPress={() => { toggleDarkMode() }}
                        />
                    </Drawer.Section>
                    <Drawer.Section
                        showDivider={false}
                    >
                        <Drawer.Item
                            label={isLoggedIn ? 'Log out' : 'Log in'}
                            // active={active === 'fourth'}
                            onPress={isLoggedIn ? handleLogout : handleLogin}
                            theme={{
                                colors: {
                                    onSurfaceVariant: isLoggedIn ? errorTextColor : tintTextColor, // text color
                                    secondaryContainer: textHighlightColor// active, highlight color
                                }
                            }}
                        />
                    </Drawer.Section>
                </MotiView>
            </Modal>
        </Portal>
    );
};

export default SideDrawerMenu;