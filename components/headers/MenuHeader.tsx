// react
import { StyleSheet, View, } from 'react-native'
import { useContext } from 'react'

// components
import SettingsIcon from '../game_idiom_swap/SettingsIcon'
import { ThemeContext } from '@/providers/ThemeProvider';

const MenuHeader = () => {

    const { backgroundColor } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        header: {
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 20,
            backgroundColor: backgroundColor
        }
    })

    return (
        <View style={styles.header}>
            <SettingsIcon />
        </View>
    )
}

export default MenuHeader
