import { Text, View, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Icon from '@/assets/images/wordle-icon.svg';
import { Link } from "expo-router";
import { buttonColors, textColors } from "@/assets/consts/colors";
import { format } from 'date-fns';

import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import ThemedTitleText from "@/components/ThemedTitleText";
import ThemedSubtitleText from "@/components/ThemedSubtitleText";

export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  return (
    <View
      style={[styles.container, {backgroundColor}]}
    >
      {/* header */}
      <View style={styles.header}>
        {/* title */}
        {/* <Text style={styles.title}>WLGYO</Text> */}
        {/* <Text style={styles.title}>When life gives you oranges</Text> */}
        <ThemedTitleText style={styles.title}>When life gives you oranges</ThemedTitleText>
        <ThemedSubtitleText style={styles.subtitle}>(Is that the saying?)</ThemedSubtitleText>
        {/* logo */}
        <Icon width={100} height={100} />
      </View>

      {/* buttons */}
      <View style={styles.menu}>
        {/* play button */}
        <Link href='/game' style={[styles.btn, styles.primaryBtn]} asChild>
          <TouchableOpacity>
            <Text style={[styles.btnText, styles.primaryBtnText]}>Play</Text>
          </TouchableOpacity>
        </Link>
        {/* archive button */}
        <Link href='/archive' style={styles.btn} asChild>
          <TouchableOpacity>
            <Text style={styles.btnText}>Archive</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Settings</Text>
        </TouchableOpacity>
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