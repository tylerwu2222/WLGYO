import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SelectableWord from './SelectableWord';
import ThemedText from '../ThemedText';


interface SelectableIdiomTextProps {
    idiom?: string;
    keywords?: string[];
    // swapWordAnswer?: string;
    selectedWord: string;
    setSelectedWord: Dispatch<SetStateAction<string>>
}

// render 
const SelectableIdiomText = ({
    idiom = 'when life gives you oranges',
    keywords = ['life', 'oranges'],
    // swapWordAnswer = 'oranges',
    selectedWord,
    setSelectedWord
}: SelectableIdiomTextProps) => {

    const idiomList = idiom.split(' ');

    const scale = useSharedValue(0);

    const handlePress = (word: string) => {
        setSelectedWord(word);
    };

    return (
        <View style={styles.idiom}>
            <ThemedText style={styles.word}>
                "{(idiomList.map((word, index) => {
                    const isLastWord = index === idiomList.length - 1;
                    if (keywords.includes(word)) {
                        return (
                            <ThemedText key={word}>
                                <SelectableWord
                                    word={word}
                                    selectedWord={selectedWord}
                                    onPressFn={() => { handlePress(word) }}
                                />{!isLastWord && ' '}
                            </ThemedText>
                        )
                    }
                    return <ThemedText key={word} style={styles.word}>
                        {word}{!isLastWord && ' '}
                    </ThemedText>
                }))}"
            </ThemedText>
        </View>
    )
}

export default SelectableIdiomText

const styles = StyleSheet.create({
    idiom: {
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