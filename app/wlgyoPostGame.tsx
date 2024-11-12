// react
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, Dimensions } from 'react-native'
import React, { useContext } from 'react'

// context
import { IdiomContext } from './_layout';

// navigation
import { Link } from 'expo-router';
// import { useIsFocused } from '@react-navigation/native';

// views
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

// styles
import { defaultStyles } from '@/constants/Styles';
import { Colors, textColors, buttonColors } from '@/constants/Colors';
import ThemedText from '@/components/typography/ThemedText';
import ThemedTitleText from '@/components/typography/ThemedTitleText';

// animation
import { useSharedValue } from 'react-native-reanimated';

// types
import { carouselCard } from '@/types/components';
import { ThemeContext } from '@/providers/ThemeProvider';

const wlgyo_postgame = () => {

  const {
    dailyIdiom
  } = useContext(IdiomContext);

  const screenWidth = Dimensions.get('window').width;
  const progress = useSharedValue(0);
  // create idiom meaning/etymology data for carousel
  let carouselData: carouselCard[] = [
    {
      header: 'Definition',
      content: dailyIdiom.definitions.join('\n\n')
    }
  ]
  if (dailyIdiom.etymology) {
    carouselData.push({
      header: 'Etymology',
      content: dailyIdiom.etymology
    })
  }

  // themed styles
  const { backgroundColor } = useContext(ThemeContext);

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
      backgroundColor: backgroundColor,
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
      fontWeight: 'bold',
      lineHeight: 40,
      fontFamily: 'Nunito_300Light',
      display: 'flex',
      justifyContent: 'center'
    },
    carouselCard: {
      flex: 1,
      // minHeight: 100,
      // height: '100%',
      padding: 30,
      margin: 30,
      backgroundColor: Colors.dark.buttonBackground,
      borderRadius: 10,
      justifyContent: 'center'
    },
    carouselText: {
      fontSize: 25,
      fontStyle: 'italic',
      color: Colors.dark.buttonText
    },
    carouselHeader: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Colors.dark.buttonText
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
    dotContainer: { gap: 5, marginBottom: 10 },
    dotStyle: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 },
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.topContainer}>
        </View> */}
        <View style={styles.subContainer}>
          {/* instructions */}
          <ThemedTitleText style={styles.instruction}>That's right! The correct saying is:</ThemedTitleText>

          {/* correct idiom */}
          <ThemedText style={styles.word}>"{dailyIdiom.idiom}"</ThemedText>
          {/* definition/etymology/example carousel */}
          <Carousel
            loop={false}
            width={screenWidth}
            height={screenWidth * 2 / 3}
            // autoPlay={true}
            data={carouselData}
            onProgressChange={progress}
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
          {carouselData.length > 1 ?
            <Pagination.Basic
              progress={progress}
              data={carouselData}
              dotStyle={styles.dotStyle}
              containerStyle={styles.dotContainer}
            /> : <></>
          }

          {/* save idiom, change to star icon */}
          <TouchableOpacity style={[defaultStyles.btn, defaultStyles.primaryBtn, { width: 160 }]}>
            <Text style={[defaultStyles.btnText, defaultStyles.primaryBtnText]}>Save idiom</Text>
          </TouchableOpacity>
          {/* navigation buttons */}
          <View>
            {/* return home */}
            <Link href='/' style={[defaultStyles.btn, { width: 160 }]} asChild>
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
