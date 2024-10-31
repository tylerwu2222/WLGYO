import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import ThemedText from '../ThemedText';

interface FloatingSwapWord {
    word: string;
    initialX: number;
    initialY: number;
    onPressFn?: () => void;
}

const FLOAT_OFFSET = 30; // Small offset for floating animation
const FloatingSwapWord = ({
    word,
    initialX,
    initialY,
    onPressFn = () => { }
}: FloatingSwapWord) => {

    // Shared values for floating effect
    const floatX = useSharedValue(initialX);
    const floatY = useSharedValue(initialY);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: floatX.value },
            { translateY: floatY.value },
        ],
        padding: 5
    }));

    useEffect(() => {
        // Animate floating movement around initial position
        floatX.value = withRepeat(
            withTiming(initialX + Math.random() * FLOAT_OFFSET - FLOAT_OFFSET / 2, {
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );

        floatY.value = withRepeat(
            withTiming(initialY + Math.random() * FLOAT_OFFSET - FLOAT_OFFSET / 2, {
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, []);

    return (
        <Animated.View style={[styles.wordContainer, animatedStyle]}>
            <Pressable
                onPress={onPressFn}
            >
                <ThemedText style={styles.word}>{word}</ThemedText>
            </Pressable>
        </Animated.View>
    )
}

export default FloatingSwapWord

const styles = StyleSheet.create({
    word: {
        fontSize: 30,
        fontFamily: 'Nunito_300Light',
        fontWeight: 'bold',
        display: 'flex'
    },
    wordContainer: {
        position: 'absolute',
        backgroundColor: Colors.light.buttonPrimaryBackgroundOrange,
        padding: 5,
        borderRadius: 5
    },
})