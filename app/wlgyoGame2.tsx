import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { IdiomContext } from './_layout';
import { Link } from 'expo-router';

import ThemedTitleText from '@/components/typography/ThemedTitleText';
import { Colors, textColors, buttonColors } from '@/constants/Colors';
import FloatingSwapView from '@/components/game_idiom_swap/FloatingSwapView';
import ThemedText from '@/components/typography/ThemedText';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';

import Animated from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';
import PartiallyBoldedText from '@/components/typography/PartiallyBoldedText';

const instructionsText = ''
const wlgyoGame2 = () => {

    const router = useRouter();

    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;

    const [instructionText, setInstructionText] = useState<ReactNode>(<Text>Select the <Text style={{ fontWeight: '900' }}>bold</Text> word that is incorrect</Text>);
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [swapWordChoices, setSwapWordChoices] = useState<string[]>([]);
    const {
        dailyIdiom
    } = useContext(IdiomContext);

    // STAGE 2
    // get idiom data
    // const initialSwapWordChoices = ['apples', 'lemons', 'bananas', 'peaches'];
    const swapWordAnswer = 'lemons';

    const initializeStage2 = () => {
        // update instructions
        setInstructionText(<Text>Select the correct word to replace <Text style={{ fontWeight: '900' }}>{dailyIdiom.swapword_incorrect}</Text></Text>)

        // set choices to swapword + swapword distractors
        const distractors_random = dailyIdiom.swapword_distractors.sort(() => 0.5 - Math.random());
        const choices = distractors_random.slice(0, 4).concat([dailyIdiom.swapword]);
        setSwapWordChoices(choices);
    };

    // initialize animation to stage 2 after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            initializeStage2();
        }, 500); // 0.5 second delay

        return () => clearTimeout(timer);
    }, []);

    const removeWord = (word: string) => {
        setSwapWordChoices(oldChoices => oldChoices.filter(w => w !== word));
    };

    const handleWLGYO2Submit = () => {
        // if correct word, continue to screen 2
        if (selectedWord == dailyIdiom.swapword) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            router.navigate('/wlgyoPostGame')
        }
        // else vibrate and remove word from options
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
        )
        removeWord(selectedWord);
    };

    useEffect(() => {
        handleWLGYO2Submit();
    }, [selectedWord]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.subContainer}>
                {/* instructions */}
                <ThemedTitleText style={styles.instruction}>{instructionText}</ThemedTitleText>

                {/* idiom text */}
                <View style={styles.idiomContainer}>
                    <ThemedText style={[styles.word]}>
                        <PartiallyBoldedText
                            text={dailyIdiom.idiom_modified}
                            boldedWords={[dailyIdiom.swapword_incorrect]} />
                    </ThemedText>
                </View>

                {/* swappable word options */}
                <FloatingSwapView
                    keywords={swapWordChoices}
                    setSelectedWord={setSelectedWord}
                />
            </View>
        </View>
    )
}

export default wlgyoGame2;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 100,
        // paddingBottom: 20,
        // justifyContent: 'space-between',
        // gap: 40
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center', // center horizontally (along main axis)
        gap: 50
    },
    idiomContainer: {
        flexWrap: 'wrap',
        lineHeight: 60
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
        lineHeight: 60,
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