import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
interface CheckBoxProps {
    option: string;
    isChecked: boolean;
    onCheckFn: () => void;
}
const Checkbox = ({ option, isChecked, onCheckFn }: CheckBoxProps) => {
    return (
        <View key={option} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <TouchableOpacity
                style={{
                    height: 24,
                    width: 24,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#000',
                    // backgroundColor: selectedOptions.includes(option) ? '#007AFF' : '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10
                }}
                onPress={() => { onCheckFn(); }}
            >
                {isChecked && (
                    <Text style={{ color: '#fff' }}>✓</Text>
                )}
            </TouchableOpacity>
            <Text>{option}</Text>
        </View>
    )
}

export default Checkbox

const styles = StyleSheet.create({})