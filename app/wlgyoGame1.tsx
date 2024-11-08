import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { IdiomContext } from './_layout';
// import { Link } from 'expo-router';

import ThemedTitleText from '@/components/typography/ThemedTitleText';
import { Colors, textColors, buttonColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectableIdiomText from '@/components/game_idiom_swap/SelectableIdiomText';

import * as Haptics from 'expo-haptics';

import Animated from 'react-native-reanimated';

const wlgyoGame1 = () => {

    const router = useRouter();

    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;
    const instructionText = <Text>Select the <Text style={{ fontWeight: '900' }}>bold</Text> word that is incorrect</Text>;
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [swapWordChoices, setSwapWordChoices] = useState<string[]>([])
    const {
        dailyIdiom
    } = useContext(IdiomContext);

    // console.log('daily idiom in screen 1', dailyIdiom);

    // STAGE 1 data
    // change eventually to params
    // const idiom = 'when life gives you oranges'
    // const swapWordAnswer = 'oranges';
    // const initialSwapWordChoices = ['life', 'oranges'];

    useEffect(() => {
        const choices = dailyIdiom.keywords.filter(w => w !== dailyIdiom.swapword).concat([dailyIdiom.swapword_incorrect])
        setSwapWordChoices(choices);
    }, []);

    // remove a word after incorrect guess
    const removeWord = (word: string) => {
        setSwapWordChoices(oldChoices => oldChoices.filter(w => w !== word));
    }

    const handleWLGYO1Submit = () => {
        // if correct word, continue to screen 2 with params
        if (selectedWord == dailyIdiom.swapword_incorrect) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            setSwapWordChoices([dailyIdiom.swapword_incorrect]); // only bold correct swap word
            router.navigate('/wlgyoGame2');
        }
        // else vibrate and remove word from options
        console.log(selectedWord, 'incorrect, vibrate?')
        // Haptics.notificationAsync(
        //     Haptics.NotificationFeedbackType.Error
        // )

        removeWord(selectedWord);
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.subContainer}>
                {/* instructions */}
                <ThemedTitleText style={styles.instruction}>{instructionText}</ThemedTitleText>
                {/* selectable text */}
                <SelectableIdiomText
                    idiom={dailyIdiom.idiom_modified}
                    keywords={swapWordChoices}
                    selectedWord={selectedWord}
                    setSelectedWord={setSelectedWord}
                />
                
                {/* submit button */}
                <TouchableOpacity
                    onPress={() => {
                        handleWLGYO1Submit();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }}
                    style={[styles.btn, styles.primaryBtn, styles.submitBtn]}
                >
                    <Text style={[styles.btnText, styles.primaryBtnText]}>submit</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default wlgyoGame1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'space-between', // justify = main axis: center vertically
        gap: 40
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
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
    text: {
        fontSize: 20,
        fontFamily: 'Nunito_300Light',
        textAlign: 'center'
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
        backgroundColor: Colors.light.buttonPrimaryBackgroundOrange,
        borderColor: Colors.light.buttonPrimaryBackgroundOrange
    },
    primaryBtnText: {
        color: buttonColors.buttonTextOrange
    },
    submitBtn: {
        position: 'absolute',
        bottom: 20
    }
})