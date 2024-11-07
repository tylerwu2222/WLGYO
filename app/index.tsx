import { Text, View, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Icon from '@/assets/images/oj-icon.svg';
import { Link } from "expo-router";
import { format } from 'date-fns';
import Animated from "react-native-reanimated";

import { Colors, buttonColors, textColors } from "@/constants/Colors";
// import ThemedText from "@/components/ThemedText";
import ThemedTitleText from "@/components/ThemedTitleText";
import ThemedSubtitleText from "@/components/ThemedSubtitleText";
import { useContext, useCallback, useEffect, useRef } from "react";
import { IdiomContext } from "./_layout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SubscribeModal from "@/components/SubscribeModal";
import { useRoute } from "@react-navigation/native";



export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const subscribeModalRef = useRef<BottomSheetModal>(null);
  const {
    fetchDailyIdiom,
    dailyIdiom
  } = useContext(IdiomContext);
  const route = useRoute();
  const isLoggedIn = false;

  const handleShowSubscribeModal = () => {
    subscribeModalRef.current?.present();
  };


  // fetch and set notes each time navigate to home
  useEffect(() => {
    // console.log('route',route.name)
    if (route.name === 'index') {
      fetchDailyIdiom();
    }
  }, [route]);

  return (
    <View
      style={[styles.container, { backgroundColor }]}
    >
      <SubscribeModal ref={subscribeModalRef} />
      {/* header */}
      <View style={styles.header}>
        {/* title */}
        <ThemedTitleText style={styles.title}>When life gives you oranges</ThemedTitleText>
        <ThemedSubtitleText style={styles.subtitle}>(Is that the saying? 🤔)</ThemedSubtitleText>

      </View>
      {/* logo */}
      <View style={styles.menu}>
        <Icon width={100} height={100} />
      </View>
      {/* buttons */}
      <View style={styles.menu}>
        {/* play button */}
        {/* navigate to screen 2 if only one keyword */}
        <Link href={dailyIdiom.keywords.length == 1 ? '/wlgyoGame2' : '/wlgyoGame1'} style={[styles.btn, styles.primaryBtn]} asChild>
          <TouchableOpacity>
            <Text style={[styles.btnText, styles.primaryBtnText]}>Daily idiom</Text>
          </TouchableOpacity>
        </Link>
        {/* archive button */}
        <Link href='/collection' style={styles.btn} asChild>
          <TouchableOpacity>
            <Text style={styles.btnText}>Collection</Text>
          </TouchableOpacity>
        </Link>
        {isLoggedIn ? <></> :
          <TouchableOpacity
            onPress={handleShowSubscribeModal}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Subscribe</Text>
          </TouchableOpacity>
        }
        {/* <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Settings</Text>
        </TouchableOpacity> */}
      </View>

      {/* footer info */}
      <View style={styles.footer}>
        <Text style={styles.footerDate}>{format(new Date(), 'MMM. d, yyyy')}</Text>
        <Text style={styles.footerText}>made by @PigPencil</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // default column for 
    paddingTop: 200,
    paddingBottom: 20,
    justifyContent: 'space-between', // justify = main axis: center vertically
    gap: 40
  },
  header: {
    alignItems: 'center', // align = secondary axis: center horizontally
    gap: 10
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  title: {
    fontSize: 30,
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
    fontSize: 18,
    fontWeight: 'semibold',
    color: buttonColors.buttonLightTextOrange
  },
  primaryBtn: {
    backgroundColor: Colors.light.buttonPrimaryBackgroundOrange,
    borderColor: Colors.light.buttonPrimaryBackgroundOrange
  },
  primaryBtnText: {
    color: Colors.light.buttonPrimaryText
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textColors.bodyTextGray
  },
  footerText: {
    fontSize: 14,
    color: textColors.footerTextOrange
  },
})