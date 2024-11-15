import { StyleSheet, Text, View } from 'react-native'
import { useContext, useState } from 'react'

import ThemedTextInput from '@/components/inputs/text/ThemedTextInput';
import { Button } from 'react-native-paper';

import { supabase } from '@/lib/supabase';

import { ThemeContext } from '@/providers/ThemeProvider';
import { defaultStyles } from '@/constants/Styles';
import ThemedText from '@/components/typography/ThemedText';


const resetPassword = () => {
    const [email, setEmail] = useState<string>('');
    const { backgroundColor, tintTextColor } = useContext(ThemeContext);

    const sendEmail = async (email: string) => {

    }

    const resetPassword = async () => {
        await supabase.auth.resetPasswordForEmail('hello@example.com', {
            redirectTo: 'http://example.com/account/update-password',
        })

        // await supabase.auth.updateUser({ password: new_password })
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
            <ThemedText>Enter your email to receive a link to reset your password:</ThemedText>
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
            <Button
                style={defaultStyles.primaryBtn}
                mode="contained"
                onPress={() => sendEmail(email)}
            >
                Send email
                {/* {mode === 'free' ? 'Sign up' : 'Subscribe'} */}
            </Button>
        </View>
    )
}

export default resetPassword

const styles = StyleSheet.create({})