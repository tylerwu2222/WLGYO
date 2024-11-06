import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { IdiomContext } from './_layout';
import { useNavigation, Link, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, textColors, buttonColors } from '@/constants/Colors';
import ThemedText from '@/components/ThemedText';
import ThemedTitleText from '@/components/ThemedTitleText';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { defaultStyles } from '@/constants/Styles';

interface carouselCard {
  header: string,
  content: string
}

const wlgyo_postgame = () => {

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const {
    dailyIdiom
  } = useContext(IdiomContext);
  // const navigation = useNavigation();
  // const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  // create idiom meaning/etymology data for carousel
  let carouselData: carouselCard[] = [
    {
      header: 'Definition',
      content: dailyIdiom.definitions.join('\n')
    }
  ]
  if (dailyIdiom.etymology) {
    carouselData.push({
      header: 'Etymology',
      content: dailyIdiom.etymology
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {/* <View style={styles.topContainer}>
        </View> */}
        <View style={styles.subContainer}>
          {/* instructions */}
          <ThemedTitleText style={styles.instruction}>That's right! The correct saying is:</ThemedTitleText>

          {/* correct idiom */}
          <ThemedText style={styles.word}>"{dailyIdiom.idiom}"</ThemedText>
          {/* definition/etymology/example carousel */}
          <Carousel
            // loop
            width={screenWidth}
            height={screenWidth / 2}
            // autoPlay={true}
            data={carouselData}
            // data={[...new Array(3).keys()]}
            // scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item, index }) => (
              <View
                style={styles.carouselCard}
              >
                <ThemedText style={styles.carouselHeader}>
                  {item.header}
                </ThemedText>
                <ThemedText style={styles.carouselText}>
                  {item.content}
                </ThemedText>
              </View>
            )}
          />
          {/* save idiom, change to star icon */}
          <TouchableOpacity style={[defaultStyles.btn, defaultStyles.primaryBtn]}>
            <Text style={[defaultStyles.btnText, defaultStyles.primaryBtnText]}>Save idiom</Text>
          </TouchableOpacity>
          {/* navigation buttons */}
          <View>
            {/* return home */}
            <Link href='/' style={defaultStyles.btn} asChild>
              <TouchableOpacity
              >
                <Text style={defaultStyles.btnText}>Home</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView >
    </SafeAreaProvider>
  )
}

export default wlgyo_postgame;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // take up all space
    // height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'center', // justify = main axis: center vertically
    gap: 20
  },
  // topContainer: {
  //   display: 'flex',
  //   flex: 1,
  //   justifyContent: 'space-between',
  // },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
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
  carouselCard: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
  },
  carouselText: {
    fontSize: 25
  },
  carouselHeader: {
    fontSize: 35,
    fontWeight: 'bold'
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