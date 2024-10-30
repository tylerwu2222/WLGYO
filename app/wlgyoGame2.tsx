import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState, useEffect, ReactNode } from 'react'
import ThemedTitleText from '@/components/ThemedTitleText';
import { textColors, buttonColors } from '@/assets/consts/colors';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import SelectableProverbText from '@/components/wlgyo/SelectableProverbText';
import Animated from 'react-native-reanimated';
import FloatingSwapView from '@/components/wlgyo/FloatingSwapView';


const instructionsText = ''
const wlgyoGame2 = () => {

    const router = useRouter();

    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;

    const [instructionText, setInstructionText] = useState<ReactNode>(<Text>Select the <Text style={{ fontWeight: '900' }}>bold</Text> word that is incorrect</Text>);
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [swapWordChoices, setSwapWordChoices] = useState<string[]>([]);

    // STAGE 2
    // get proverb data
    const proverb = 'when life gives you oranges'
    const initialSwapWordChoices = ['apples', 'lemons', 'bananas', 'peaches'];
    const swapWordAnswer = 'lemons';

    // STAGE 2
    const initializeStage2 = () => {
        // update instructions
        setInstructionText(<Text>Select the correct word to replace <Text style={{ fontWeight: '900' }}>{swapWordAnswer}</Text></Text>)
        // move proverb to top

        // animate in options
        setSwapWordChoices(initialSwapWordChoices);
    };

    // initialize animation to stage 2 after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            initializeStage2();
        }, 1000); // 1 second delay

        return () => clearTimeout(timer);
    }, []);

    const removeWord = (word: string) => {
        setSwapWordChoices(oldChoices => oldChoices.filter(w => w !== word));
    };



    const handleWLGYO2Submit = () => {
        // if correct word, continue to screen 2
        if (selectedWord == swapWordAnswer) {
            router.navigate('/wlgyoPostGame')
        }
        // else vibrate and remove word from options
        removeWord(selectedWord);
    };

    useEffect(() => {
        handleWLGYO2Submit();
    }, [selectedWord]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* instructions */}
            <View style={styles.subContainer}>
                <ThemedTitleText style={styles.instruction}>{instructionText}</ThemedTitleText>
            </View>
            {/* proverb text */}
            <Animated.View
                style={styles.subContainer}
            >
                <Text style={[styles.word]}>{proverb}</Text>
            </Animated.View>

            {/* swappable word options */}
            <View style={styles.subContainer}>
                <FloatingSwapView
                    swapWordChoices={swapWordChoices}
                    setSelectedWord={setSelectedWord}
                />
            </View>
        </View>
    )
}

export default wlgyoGame2;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center'
    },
    subContainer: {
        paddingVertical: 10
    },
    instruction: {
        fontSize: 20,
        fontFamily: 'Nunito_400Regular',
        color: textColors.titleTextOrange
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Nunito_300Light',
        color: textColors.subtitleTextOrange
    },
    word: {
        fontSize: 30,
        lineHeight: 40,
        fontFamily: 'Nunito_300Light',
        display: 'flex',
        justifyContent: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: buttonColors.buttonLightOrange,
        borderColor: buttonColors.buttonLightTextOrange,
        borderWidth: 1,
        width: '30%',
        maxWidth: 200
    },
    btnText: {
        padding: 14,
        fontSize: 16,
        fontWeight: 'semibold',
        color: buttonColors.buttonLightTextOrange
    },
    primaryBtn: {
        backgroundColor: buttonColors.buttonOrange,
        borderColor: buttonColors.buttonOrange
    },
    primaryBtnText: {
        color: buttonColors.buttonTextOrange
    },
})