import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { IdiomContext } from './_layout';
import { Link, useLocalSearchParams } from 'expo-router';

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
import { ThemeContext } from '@/providers/ThemeProvider';

const instructionsText = ''
const wlgyoGame2 = () => {

    const router = useRouter();
    // themed styles
    const { tintTextColor, textColor, backgroundColor } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingHorizontal: 30,
            paddingTop: 100,
            backgroundColor: backgroundColor
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
            color: tintTextColor
        },
        
        word: {
            fontSize: 30,
            lineHeight: 60,
            fontFamily: 'Nunito_300Light',
            display: 'flex',
            justifyContent: 'center',
            color: textColor
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

    const [instructionText, setInstructionText] = useState<ReactNode>(<Text>Select the <Text style={{ fontWeight: '900' }}>bold</Text> word that is incorrect</Text>);
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [swapWordChoices, setSwapWordChoices] = useState<string[]>([]);

    // daily or random idiom
    const { idiom_string } = useLocalSearchParams();
    // console.log('idiom string in w2', idiom_string);
    const idiomData = JSON.parse(idiom_string as string);

    // STAGE 2
    // get idiom data
    // const initialSwapWordChoices = ['apples', 'lemons', 'bananas', 'peaches'];
    const swapWordAnswer = 'lemons';

    const initializeStage2 = () => {
        // update instructions
        setInstructionText(<Text>Select the correct word to replace <Text style={{ fontWeight: '900' }}>{idiomData.swapword_incorrect}</Text></Text>)

        // set choices to swapword + swapword distractors
        const distractors_random = idiomData.swapword_distractors.sort(() => 0.5 - Math.random());
        const choices = distractors_random.slice(0, 4).concat([idiomData.swapword]);
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
        if (selectedWord == idiomData.swapword) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            // router.navigate('/wlgyoPostGame')
            router.navigate({ pathname: '/wlgyoPostGame', params: { 'idiom_string': idiom_string } });
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
        <View style={[styles.container]}>
            <View style={styles.subContainer}>
                {/* instructions */}
                <ThemedTitleText style={styles.instruction}>{instructionText}</ThemedTitleText>

                {/* idiom text */}
                <View style={styles.idiomContainer}>
                    <ThemedText style={[styles.word]}>
                        <PartiallyBoldedText
                            text={idiomData.idiom_modified}
                            boldedWords={[idiomData.swapword_incorrect]} />
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
