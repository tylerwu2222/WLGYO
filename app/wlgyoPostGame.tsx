import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import { IdiomContext } from './_layout';
import { useNavigation, Link, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

import { Colors, textColors, buttonColors } from '@/constants/Colors';
import ThemedText from '@/components/ThemedText';
import ThemedTitleText from '@/components/ThemedTitleText';
import Animated from 'react-native-reanimated';

const wlgyo_postgame = () => {

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const {
    dailyIdiom
  } = useContext(IdiomContext);
  // const navigation = useNavigation();
  // const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.subContainer}>
        {/* instructions */}
        <ThemedTitleText style={styles.instruction}>That's right! The correct saying is:</ThemedTitleText>

        {/* correct idiom */}
        <ThemedText style={styles.word}>{dailyIdiom.idiom}</ThemedText>

        {/* return home */}
        <Link href='/' style={styles.btn} asChild>
          <TouchableOpacity
          >
            <Text style={styles.btnText}>Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
      {/* other player stats/trivia */}
      <View>

        <ThemedText>Stats / trivia</ThemedText>
      </View>
    </View >
  )
}

export default wlgyo_postgame;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
    fontSize: 18,
    fontWeight: 'semibold',
    color: buttonColors.buttonLightTextOrange
  },
})