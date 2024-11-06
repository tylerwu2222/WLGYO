import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import ThemedText from '../ThemedText';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ArchivedGameSelectorProps {
    date: string;
    isLocked?: boolean;
    onPressFn: () => void;
}

// styled archive game selector
const ArchivedGameSelector = ({ date, isLocked = true, onPressFn = () => { } }: ArchivedGameSelectorProps) => {
    return (
        <View style={[styles.selector]}>
            <Pressable onPress={onPressFn} style={styles.selectorPressable}>
                <ThemedText style={styles.selectorText}>{date}</ThemedText>
                {isLocked ?
                    <FontAwesome5 name="lock" size={20} color={Colors.light.buttonText} /> :
                    <></>
                }
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
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderRadius: 10,
        justifyContent: 'center'
    },
    selectorPressable: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectorText: {
        fontSize: 15,
        fontFamily: 'Nunito_400Regular',
        // fontWeight: 'bold',
        color: Colors.light.buttonText
    }
})