import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SelectableWord from './SelectableWord';
import ThemedText from '../ThemedText';


interface PartiallyBoldedTextProps {
    text: string;
    boldedWords?: string[];
}

// render 
const PartiallyBoldedText = ({
    text = 'when life gives you oranges',
    boldedWords = ['life', 'oranges'],
}: PartiallyBoldedTextProps) => {

    const textList = text.split(' ');
    // console.log('bold props', text, boldedWords);
    return (
        <View style={styles.text}>
            <ThemedText style={styles.word}>
                "{(textList.map((word, index) => {
                    const isLastWord = index === textList.length - 1;
                    if (boldedWords.includes(word)) {
                        return (
                            <ThemedText key={word} style={[styles.word, styles.boldWord]}>
                                {word}{!isLastWord && ' '}
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

export default PartiallyBoldedText

const styles = StyleSheet.create({
    text: {
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
    boldWord: {
        fontWeight: 'bold',
        borderColor: 'black'
    }
})