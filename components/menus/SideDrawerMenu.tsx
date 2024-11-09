import { useState, useContext } from 'react';
import { StyleSheet, Dimensions, useColorScheme } from 'react-native';


import { Portal, Modal, Drawer } from 'react-native-paper';
import { MotiView, View } from 'moti';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
// import { HomeContext } from '@/app/home';
import { IdiomContext } from '@/app/_layout';
// import { signOutUser } from '@/src/providers/UserProvider/UserProvider';

import { Link } from 'expo-router';
import ToggleSwitch from '../inputs/switches/ToggleSwitch';
import { ThemeContext } from '@/providers/ThemeProvider';

const SideDrawerMenu = () => {
    const topOffset = 60;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // track 
    const [active, setActive] = useState('');
    const {
        sideMenuVisible,
        setSideMenuVisible,
        theme,
        setTheme } = useContext(IdiomContext);
    const [darkModeOn, setDarkModeOn] = useState<boolean>(theme === 'dark');

    // console.log('color scheme', theme);

    // themed styles
    const {
        backgroundColor,
        textColor,
        tintTextColor,
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

    const handleLogout = () => {
        // sign out user and navigate to auth page
        // signOutUser();
    };

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
                        {/* change to auth path when created */}
                        <Link href="/" asChild>
                            <Drawer.Item
                                label='Logout'
                                active={active === 'fourth'}
                                onPress={handleLogout}
                                theme={{
                                    colors: {
                                        onSurfaceVariant: tintTextColor, // text color
                                        secondaryContainer: textHighlightColor// active, highlight color
                                    }
                                }}
                            />
                        </Link>
                    </Drawer.Section>
                </MotiView>
            </Modal>
        </Portal>
    );
};

export default SideDrawerMenu;