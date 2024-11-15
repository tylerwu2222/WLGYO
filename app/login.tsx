import { StyleSheet, View } from 'react-native'
import { useState, useContext } from 'react'

import { Link, useRouter } from 'expo-router';

import { Button } from 'react-native-paper';

import { ThemeContext } from '@/providers/ThemeProvider';
import ThemedTextInput from '@/components/inputs/text/ThemedTextInput';

import { supabase } from '@/lib/supabase';
import { defaultStyles } from '@/constants/Styles';
import LinkText from '@/components/typography/LinkText';
import ThemedText from '@/components/typography/ThemedText';
import { IdiomContext } from './_layout';

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setSession } = useContext(IdiomContext);

  const {
    backgroundColor,
    textHighlightColor,
    tintTextColor
  } = useContext(ThemeContext);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // check if email password exists
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('login data', data);
    // if error, display error message
    if (error) {
      setLoginError('Invalid email or password, please try again')
    }
    else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      router.back();
    }
    setLoading(false);
  };



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
          {loginError ? <ThemedText
            style={{ color: 'red' }}
          >
            {loginError}
          </ThemedText> : <></>
          }
        </View>
        <Button
          style={defaultStyles.primaryBtn}
          mode="contained"
          disabled={loading}
          onPress={() => login(email, password)}
        >
          Log in
        </Button>
        <Link href='/resetPassword'>
          <LinkText>Forgot password?</LinkText>
        </Link>
      </View>
    </View>
  )
}

export default login;