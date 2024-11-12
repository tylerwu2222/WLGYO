import { Alert, StyleSheet, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeProvider';

// components
import { Button } from 'react-native-paper';
import ThemedTextInput from '@/components/inputs/text/ThemedTextInput';
import ThemedTitleText from '@/components/typography/ThemedTitleText';

// auth
import { supabase } from '@/lib/supabase';

// styles
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';

// interface subscribeProps {
//   mode: 'free' | 'paid'
// }
const subscribe = (
  // { mode = 'free' }: subscribeProps
) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function signUpNewUser(email: string, password: string) {
    console.log('signing up', email, password);

    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: ''
      }
    })

    // show alert to check email:
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your email: ' + email + ' for email verification! Then come back here to sign in')
    setLoading(false)

    // console.log('session returned', session); // null
    // navigate back to home
    router.navigate('/');

  }

  async function signUpWithEmail() {

  }

  const {
    backgroundColor,
    textHighlightColor,
    tintTextColor
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
    },
    header: {
      fontSize: 20,
      fontFamily: 'Nunito_400Regular',
      color: tintTextColor
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    }
  })

  return (
    <View style={styles.container}>
      {/* info */}
      <View>
        <ThemedTitleText style={styles.header}>Sign up</ThemedTitleText>
      </View>
      {/* form */}
      <View style={styles.formContainer}>
        {/* email, pw fields */}
        <View style={styles.verticallySpaced}>
          <ThemedTextInput
            label="Email"
            mode={'outlined'}
            value={email}
            onChangeTextFn={text => setEmail(text)}
            textInputColor={tintTextColor}
            backgroundColor={backgroundColor}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <ThemedTextInput
            label="Password"
            mode={'outlined'}
            value={password}
            isPassword={true}
            onChangeTextFn={text => setPassword(text)}
            textInputColor={tintTextColor}
            backgroundColor={backgroundColor}
          />
        </View>
        <Button
          style={defaultStyles.primaryBtn}
          mode="contained"
          onPress={() => signUpNewUser(email, password)}
        >
          Sign Up
          {/* {mode === 'free' ? 'Sign up' : 'Subscribe'} */}
        </Button>
      </View>
    </View>
  )
}

export default subscribe
