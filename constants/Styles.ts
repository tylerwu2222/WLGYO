import { Colors, buttonColors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: buttonColors.buttonLightOrange,
    borderColor: buttonColors.buttonLightTextOrange,
    borderWidth: 1,
    // width: '30%',
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
    borderColor: Colors.light.buttonPrimaryBackgroundOrange,
  },
  primaryBtnText: {
    color: Colors.light.buttonPrimaryText
  },
});