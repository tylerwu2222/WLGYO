import { Colors } from '@/constants/Colors';
import { Text, TextProps, useColorScheme } from 'react-native';

const ThemedText = ({ style, children, ...rest }: TextProps) => {
  const colorScheme = useColorScheme();
  // console.log('color scheme in themedText', colorScheme);
  const color = Colors[colorScheme === 'dark' ? 'dark' : 'light'].text;

  return (
    <Text style={[{ color }, style]} {...rest}>
      {children}
    </Text>
  );
};
export default ThemedText;