// react
import { StyleSheet, View, } from 'react-native'
import { useContext } from 'react'

// components
import SettingsIcon from '../navigation/SettingsIcon'
import { ThemeContext } from '@/providers/ThemeProvider';
import BackIcon from '../navigation/BackIcon';

const BackHeader = () => {

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
            <BackIcon />
        </View>
    )
}

export default BackHeader
