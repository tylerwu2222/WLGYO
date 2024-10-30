import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import ThemedTitleText from '@/components/ThemedTitleText';
import { textColors, buttonColors } from '@/assets/consts/colors';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import SelectableProverbText from '@/components/wlgyo/SelectableProverbText';


const instructionsText = ''
const game = () => {

    const router = useRouter();

    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;

    const [selectedWord, setSelectedWord] = useState<string>('');

    // get proverb data
    const proverb = 'when life gives you oranges'
    const swapWordChoices = ['life', 'oranges']
    const swapWordAnswer = 'oranges'

    const navigateToGameScreen2 = () => {

    };
    const handleWLGYO1Submit = () => {
        // if correct word, continue to screen 2
        if (selectedWord == swapWordAnswer){
            router.navigate('/wlgyo2')
        }
        // else vibrate and debold
    };
    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* instructions */}
            <ThemedTitleText style={styles.instruction} >Select the <Text style={{ fontWeight: '900' }}>bold</Text> word that is incorrect</ThemedTitleText>

            {/* selectable game text */}
            <SelectableProverbText
                selectedWord={selectedWord}
                setSelectedWord={setSelectedWord}
            />

            {/* submit button */}
            <TouchableOpacity
                onPress={() => { handleWLGYO1Submit() }}
                style={[styles.btn, styles.primaryBtn]}
            >
                <Text style={[styles.btnText, styles.primaryBtnText]}>submit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default game

const styles = StyleSheet.create({
    container: {
        flex: 1, // default column for 
        padding: 30,
        paddingBottom: 20,
        justifyContent: 'space-between', // justify = main axis: center vertically
        gap: 40
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
        backgroundColor: buttonColors.buttonOrange,
        borderColor: buttonColors.buttonOrange
    },
    primaryBtnText: {
        color: buttonColors.buttonTextOrange
    },
})