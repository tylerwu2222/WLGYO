import { StyleSheet, Text, View } from 'react-native'
import { createContext, ReactNode, useContext } from 'react'
import { Colors } from '@/constants/Colors'
import { IdiomContext } from '@/app/_layout'

interface ThemeContextProps {
    backgroundColor: string;
    textColor: string;
    tintTextColor: string;
    errorTextColor: string;
    textHighlightColor: string;
}

export const ThemeContext = createContext({} as ThemeContextProps)

const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const { theme } = useContext(IdiomContext);

    // styled colors/typographies/styles
    const backgroundColor = Colors[theme ?? 'light'].background;
    const textColor = Colors[theme ?? 'light'].text;
    const tintTextColor = Colors[theme ?? 'light'].titleTextOrange;
    const errorTextColor = Colors[theme ?? 'light'].errorText;
    const textHighlightColor = Colors[theme ?? 'light'].highlight;

    return (
        <ThemeContext.Provider
            value={{
                backgroundColor,
                textColor,
                tintTextColor,
                errorTextColor,
                textHighlightColor
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

const styles = StyleSheet.create({})