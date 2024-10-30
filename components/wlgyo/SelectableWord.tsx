import { StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors';

interface SelectableWordProps {
    word: string;
    selectedWord: string;
    onPressFn?: () => void;
}

const SelectableWord = ({
    word,
    selectedWord,
    onPressFn = () => { }
}: SelectableWordProps) => {

    const scale = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: scale.value,
        backgroundColor: Colors.light.highlightText, // The fill color you want
        padding: 10,
        borderRadius: 10
    }));

    useEffect(() => {
        scale.value = withTiming(word === selectedWord ? 1 : 0, { duration: 500 });
    }, [selectedWord]);

    const handlePress = (word: string) => {
        console.log('pressed', word);
        onPressFn();
    };

    return (
        <Pressable
            key={word}
            onPress={() => {
                handlePress(word)
            }}
        >
            <Animated.View style={[styles.animatedBackground, animatedStyle]} />
            <Text
                style={[styles.word, styles.swappableWord]}>
                {word}
            </Text>
        </Pressable>
    )
}

export default SelectableWord

const styles = StyleSheet.create({
    word: {
        fontSize: 30,
        fontFamily: 'Nunito_300Light',
        display: 'flex'
    },
    swappableWord: {
        fontWeight: 'bold',
        borderColor: 'black'
    },
    animatedBackground: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }
})