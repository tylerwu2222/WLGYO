import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { IdiomContext } from './_layout';
// import { Link } from 'expo-router';

import ThemedTitleText from '@/components/typography/ThemedTitleText';
import { Colors, textColors, buttonColors } from '@/constants/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectableIdiomText from '@/components/game_idiom_swap/SelectableIdiomText';

import * as Haptics from 'expo-haptics';

import Animated from 'react-native-reanimated';
import { ThemeContext } from '@/providers/ThemeProvider';

const wlgyoGame1 = () => {

    const router = useRouter();
    // themed styles
    const {
        textColor,
        tintTextColor,
        backgroundColor } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 30,
            paddingBottom: 20,
            justifyContent: 'space-between', // justify = main axis: center vertically
            gap: 40,
            backgroundColor: backgroundColor
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
            color: tintTextColor
        },
        text: {
            fontSize: 20,
            fontFamily: 'Nunito_300Light',
            textAlign: 'center',
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

    const instructionText = <Text>Select the <Text style={{ fontWeight: '900' }}>bold</Text> word that is incorrect</Text>;
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [swapWordChoices, setSwapWordChoices] = useState<string[]>([])
    // const {
    //     idiomData
    // } = useContext(IdiomContext);

    // console.log('daily idiom in screen 1', idiomData);

    // daily or random idiom
    const { idiom_string } = useLocalSearchParams();
    const idiomData = JSON.parse(idiom_string as string);

    // STAGE 1 data
    useEffect(() => {
        const choices = idiomData.keywords.filter((w: string) => w !== idiomData.swapword).concat([idiomData.swapword_incorrect])
        setSwapWordChoices(choices);
    }, []);

    // remove a word after incorrect guess
    const removeWord = (word: string) => {
        setSwapWordChoices(oldChoices => oldChoices.filter(w => w !== word));
    }

    const handleWLGYO1Submit = () => {
        // if correct word, continue to screen 2 with params
        if (selectedWord == idiomData.swapword_incorrect) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            setSwapWordChoices([idiomData.swapword_incorrect]); // only bold correct swap word
            router.navigate({ pathname: '/wlgyoGame2', params: { 'idiom_string': idiom_string } });
        }
        // else vibrate and remove word from options
        console.log(selectedWord, 'incorrect, vibrate?')
        // Haptics.notificationAsync(
        //     Haptics.NotificationFeedbackType.Error
        // )

        removeWord(selectedWord);
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.subContainer}>
                {/* instructions */}
                <ThemedTitleText style={styles.instruction}>{instructionText}</ThemedTitleText>
                {/* selectable text */}
                <Text style={styles.text}>
                    <SelectableIdiomText
                        idiom={idiomData.idiom_modified}
                        keywords={swapWordChoices}
                        selectedWord={selectedWord}
                        setSelectedWord={setSelectedWord}
                    />
                </Text>

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