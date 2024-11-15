import { StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeProvider';
import ThemedText from '@/components/typography/ThemedText';
import ThemedTitleText from '@/components/typography/ThemedTitleText';

const settings = () => {


  const {
    backgroundColor,
    // textHighlightColor,
    // tintTextColor
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1, // take up all space
      paddingHorizontal: 30,
      paddingVertical: 100,
      justifyContent: 'center', // justify = main axis: center vertically
      backgroundColor: backgroundColor
    },
    formContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
    }
  })


  return (
    <View style={styles.container}>
      <ThemedTitleText>settings</ThemedTitleText>
    </View>
  )
}

export default settings