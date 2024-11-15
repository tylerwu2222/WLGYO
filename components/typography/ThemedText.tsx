import { ThemeContext } from '@/providers/ThemeProvider';
import { useContext } from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';

const ThemedText = ({ style, children, ...rest }: TextProps) => {
  const { textColor } = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  return (
    <Text style={[{ color: textColor }, style]} {...rest}>
      {children}
    </Text>
  );
};
export default ThemedText;