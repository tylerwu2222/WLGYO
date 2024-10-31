import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import ThemedText from '../ThemedText';

interface ArchivedGameSelectorProps {
    date: string;
    onPressFn: () => void;
}

// styled archive game selector
const ArchivedGameSelector = ({ date, onPressFn = () => { } }: ArchivedGameSelectorProps) => {


    return (
        <View style={[styles.selector]}>
            <Pressable onPress={onPressFn}>
                <ThemedText style={styles.selectorText}>{date}</ThemedText>
            </Pressable>
        </View>
    )
}

export default ArchivedGameSelector

const styles = StyleSheet.create({
    selector: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: Colors.light.buttonBackground,
        borderColor: Colors.light.buttonText,
        borderRadius: 20,
        justifyContent: 'center'
    },
    selectorText: {
        fontSize: 30,
        fontFamily: 'Nunito_400Regular',
        // fontWeight: 'bold',
        color: Colors.light.buttonText
    }
})