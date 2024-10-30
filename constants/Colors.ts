/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    // titleText: '',
    titleTextOrange: '#ffa509',
    subtitleTextOrange: '#ffc764',
    buttonPrimaryText: '#ECEDEE',
    bodyText: '#472d00',
    highlightText: '#ffdb9a',
    icon: '#472d00',
    footerText:'#9c6c1a',
    footerText2: '#c49951',
    
    buttonPrimaryBackgroundOrange: '#ffa509',
    buttonText: '#ffdb9a',

    background: '#fffaeb',    
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    // background: '#595755',
    titleTextOrange:'#ffa509',
    subtitleTextOrange: '#ffc764',
    bodyText: '#ECEDEE',
    icon: '#ECEDEE',
    footerText:'#9c6c1a',
    background: '#3a3a3a',

    tint: tintColorDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

const buttonColors = {
  buttonLightOrange: '#fff7e1',
  buttonLightTextOrange: '#ffab1b',
  buttonOrange: '#ffc764',
  buttonTextOrange: '#fff7e1'
  // buttonTextOrange: '#b06d00'
}

const textColors = {
  titleTextOrange: '#ffa509',
  subtitleTextOrange: '#ffc764',
  footerTextOrange: '#c49951',
  bodyTextGray: '#9c6c1a',
  bodyTextBlack: '#472d00'
}

export const backgroundColors = {
  backgroundLight: '#fffaeb',
  backgroundDark: '#595755'
}
