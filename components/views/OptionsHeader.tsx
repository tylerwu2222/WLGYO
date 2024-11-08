import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingsIcon from '../game_idiom_swap/SettingsIcon'

const OptionsHeader = () => {

    return (
        <View style={styles.header}>
            <SettingsIcon />
        </View>
    )
}

export default OptionsHeader

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20
    }
})