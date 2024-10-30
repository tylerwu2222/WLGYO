import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import FloatingSwapWord from './FloatingSwapWord'

interface FloatingSwapViewProps {
    swapWordChoices: string[];
    // selectedWord: string;
    setSelectedWord: Dispatch<SetStateAction<string>>
}

const FloatingSwapView = ({
    swapWordChoices,
    setSelectedWord }: FloatingSwapViewProps) => {

    const handlePress = (word: string) => {
        setSelectedWord(word);
    };

    return (
        <View style={styles.floatingView}>
            {swapWordChoices.map((w, index) => {
                const initialX = 0; // Adjust for spacing between columns
                const initialY = index * 100; // Adjust for spacing between rows
                return (
                    <FloatingSwapWord
                        key={w}
                        word={w}
                        initialX={initialX}
                        initialY={initialY}
                        onPressFn={() => { handlePress(w) }} />
                )
            })
            }
        </View>
    )
}

export default FloatingSwapView

const styles = StyleSheet.create({
    floatingView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    }
})