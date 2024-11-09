import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/providers/ThemeProvider";
import { ReactNode, useContext } from "react";
import { StyleSheet, Platform, StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const SafeViewAndroid = ({ children }: { children: ReactNode }) => {

    const { backgroundColor } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        AndroidSafeArea: {
            flex: 1,
            backgroundColor: backgroundColor,
            paddingTop: Platform.OS === "android" ? 20 : 0
            // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }
    });
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            {children}
        </SafeAreaView >
    )
}

export default SafeViewAndroid

