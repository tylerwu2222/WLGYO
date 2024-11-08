import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

interface RadioButtonProps {
    option: string;
    isSelected: boolean;
    onSelectFn: () => void;
    fillColor?: string;
    borderColor?: string;
}
const RadioButton = ({
    option,
    isSelected,
    onSelectFn,
    fillColor = Colors.light.buttonPrimaryBackgroundOrange,
    borderColor = Colors.light.buttonPrimaryText,
}: RadioButtonProps) => {

    const styles = StyleSheet.create({
        radioOutline: {
            height: 24,
            width: 24,
            borderRadius: 12, // Circular shape for radio button
            borderWidth: 2,
            borderColor: borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        radioSelected: {
            height: 14,
            width: 14,
            borderRadius: 6,
            backgroundColor: fillColor,
        },
        radioText: {
            color: borderColor
        }
    })

    return (
        <View key={option} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <TouchableOpacity
                style={styles.radioOutline}
                onPress={() => onSelectFn()}
            >
                {isSelected && (
                    <View
                        style={styles.radioSelected}
                    />
                )}
            </TouchableOpacity>
            <Text
                style={styles.radioText}
            >{option}</Text>
        </View>
    )
}

export default RadioButton
