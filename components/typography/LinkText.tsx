import { StyleSheet, Text, TextProps } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeProvider';

const LinkText = ({ style, children, ...rest }: TextProps) => {
    const { tintTextColor } = useContext(ThemeContext);
    return (
        <Text style={[style, { color: tintTextColor, textDecorationLine: 'underline' }]} {...rest}>
            {children}
        </Text>
    );
}

export default LinkText

const styles = StyleSheet.create({})