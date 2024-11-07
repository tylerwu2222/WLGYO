import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import RadioButton from './RadioButton';
import { buttonColors, Colors } from '@/constants/Colors';
interface RadioButtonGroup {
    options: string[];
    selectedOption: string;
    setSelectedOption: Dispatch<SetStateAction<string>>;
    onSelectFn?: () => void;
    fillColor?: string;
    borderColor?: string;
    orientation?: 'vertical' | 'horizontal'
}

const RadioButtonGroup = ({
    options,
    selectedOption,
    setSelectedOption,
    onSelectFn = () => { },
    fillColor = Colors.light.buttonPrimaryBackgroundOrange,
    borderColor = Colors.light.buttonPrimaryText,
    orientation = 'vertical'
}: RadioButtonGroup) => {

    const styles = StyleSheet.create({
        radioGroup: {
            display: 'flex',
            flexDirection: orientation === 'vertical' ? 'column' : 'row',
            columnGap: 15
        }
    })

    return (
        <View style={styles.radioGroup}>
            {options.map((o) => {
                return <RadioButton
                    key={o}
                    option={o}
                    isSelected={selectedOption === o}
                    onSelectFn={() => {
                        setSelectedOption(o);
                        onSelectFn();
                    }}
                    fillColor={fillColor}
                    borderColor={borderColor}
                />
            })}
        </View>
    )
}

export default RadioButtonGroup
