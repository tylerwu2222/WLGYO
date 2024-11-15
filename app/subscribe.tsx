import { Alert, StyleSheet, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeProvider';

// components
import ThemedTextInput from '@/components/inputs/text/ThemedTextInput';
import ThemedTitleText from '@/components/typography/ThemedTitleText';
import { Modal, Portal, Text, Button } from 'react-native-paper';

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
  const [emailAlertVisible, setEmailAlertVisible] = useState<boolean>(false);
  const [credentialErrors, setCredentialErrors] = useState<string[]>([]);
  const [credentialErrorsVisible, setCredentialErrorsVisible] = useState<boolean>(false);

  const showModal = () => setEmailAlertVisible(true);
  const hideModal = () => setEmailAlertVisible(false);


  const signUpNewUser = async (email: string, password: string) => {
    console.log('signing up', email, password);

    setLoading(true)
    // const {
    //   data: { session },
    //   error,
    // } = await supabase.auth.signUp({
    //   email: email,
    //   password: password,
    //   options: {
    //     emailRedirectTo: ''
    //   }
    // })

    // show alert to check email:
    // if (error) Alert.alert(error.message)
    // if (!session) 
    setEmailAlertVisible(true);
    setLoading(false)

    // console.log('session returned', session); // null
    // navigate back to home
    // router.navigate('/');

  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  }

  // check that email and password are valid
  const handleNewUser = async (email: string, password: string) => {
    setCredentialErrors([]); // reset errors on each sign up press
    // sign up if valid
    if (isValidEmail(email) && isValidPassword(password)) {
      await signUpNewUser(email, password);
      setCredentialErrorsVisible(false);
    }
    // else
    if (!isValidEmail(email)) {
      // show email error message
      setCredentialErrors(errors => [...errors, "That isn't a valid email address"])
      setCredentialErrorsVisible(true);
    }
    // check password
    if (!isValidPassword(password)) {
      // show pw length message
      setCredentialErrors(errors => [...errors, "Password must be at least 8 characters"])
      setCredentialErrorsVisible(true);
    }

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
    },
    emailAlert: {
      padding: 20,
      backgroundColor: backgroundColor,
      shadowColor: 'black'
    }
  })

  return (
    <View style={styles.container}>
      {/* email notif */}
      <Portal>
        <Modal visible={emailAlertVisible} onDismiss={hideModal} contentContainerStyle={styles.emailAlert}>
          <Text>Check your email: {email} to activate your account.</Text>
        </Modal>
      </Portal>
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
