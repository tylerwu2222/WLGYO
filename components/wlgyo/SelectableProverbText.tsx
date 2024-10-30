import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SelectableWord from './SelectableWord';


interface SelectableProverbTextProps {
    proverb?: string;
    swapWordChoices?: string[];
    // swapWordAnswer?: string;
    selectedWord: string;
    setSelectedWord: Dispatch<SetStateAction<string>>
}

// render 
const SelectableProverbText = ({
    proverb = 'when life gives you oranges',
    swapWordChoices = ['life', 'oranges'],
    // swapWordAnswer = 'oranges',
    selectedWord,
    setSelectedWord
}: SelectableProverbTextProps) => {

    const proverbList = proverb.split(' ');

    const scale = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: scale.value,
        backgroundColor: 'blue', // The fill color you want
    }));

    const handlePress = (word: string) => {
        setSelectedWord(word);
    };

    return (
        <View style={styles.proverb}>
            <Text style={styles.word}>
                "{(proverbList.map((word, index) => {
                    const isLastWord = index === proverbList.length - 1;
                    if (swapWordChoices.includes(word)) {
                        return (
                            <Text>
                                <SelectableWord
                                    word={word}
                                    selectedWord={selectedWord}
                                    onPressFn={() => { handlePress(word) }}
                                />{!isLastWord && ' '}
                            </Text>
                        )
                    }
                    return <Text key={word} style={styles.word}>
                        {word}{!isLastWord && ' '}
                    </Text>
                }))}"
            </Text>
        </View>
    )
}

export default SelectableProverbText

const styles = StyleSheet.create({
    proverb: {
        display: 'flex',
        alignItems: 'center'
    },
    word: {
        fontSize: 30,
        lineHeight: 40,
        fontFamily: 'Nunito_300Light',
        display: 'flex',
        justifyContent: 'center'
    },
    swappableWord: {
        fontWeight: 'bold',
        borderColor: 'black'
    },
    animatedBackground: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    }
})