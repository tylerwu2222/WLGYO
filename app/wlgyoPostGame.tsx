import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors, textColors } from '@/constants/Colors';
import ThemedText from '@/components/ThemedText';
import ThemedTitleText from '@/components/ThemedTitleText';

const wlgyo2 = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const proverb = 'when life gives you lemons';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View>
        <ThemedTitleText style={styles.instruction}>That's right! The saying goes:</ThemedTitleText>
        <ThemedText style={styles.word}>{proverb}</ThemedText>
      </View>
      {/* other player stats/trivia */}
      <View>
        <ThemedText>Stats / trivia</ThemedText>
      </View>
    </View>
  )
}

export default wlgyo2

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center'
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
})